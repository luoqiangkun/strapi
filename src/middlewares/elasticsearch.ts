import { env } from "@strapi/utils";
import { Client } from "@elastic/elasticsearch";
import striptags from 'striptags';

const pageTypes = ["api::article.article", "api::faq.faq"];
const pageActions = ["publish"];

const elasticsearch = () => {
  return async (context, next) => {
    if (
      !pageTypes.includes(context.uid) ||
      !pageActions.includes(context.action)
    ) {
      return await next();
    }
    const result = await next();
    const { entries } = result;
    const client = new Client({
      node: env("ELASTICSEARCH_HOST", "http://localhost:9200"),
    });

    const body = entries.flatMap((entry) => [
      { index: { _index: "text", _id: entry.documentId } },
      context.uid == 'api::article.article' ?
      {
        category: "文章",
        title: entry.text,
        content: striptags(entry.content),
        locale: entry.locale,
      } : 
      {
        category: "问答",
        title: entry.question,
        content: entry.answer,
        locale: entry.locale,
      } 
    ]);

    await client.bulk({ refresh: true, body });
    return result;
  };
};

export default elasticsearch;
