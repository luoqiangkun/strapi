import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images'>;
    menu: Schema.Attribute.Component<'shared.menu', true>;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    leftNavBar: Schema.Attribute.Component<'shared.nav', true>;
    logo: Schema.Attribute.Component<'shared.image', false>;
    rightNavBar: Schema.Attribute.Component<'shared.nav', true>;
  };
}

export interface SharedBody extends Struct.ComponentSchema {
  collectionName: 'components_shared_bodies';
  info: {
    displayName: 'Body';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    target: Schema.Attribute.Enumeration<['_self']>;
    URL: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<
      ['_self', '_blank', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
  };
}

export interface SharedMarkdown extends Struct.ComponentSchema {
  collectionName: 'components_shared_markdowns';
  info: {
    displayName: 'Markdown';
  };
  attributes: {
    markdown: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
  };
}

export interface SharedMenu extends Struct.ComponentSchema {
  collectionName: 'components_shared_menus';
  info: {
    displayName: 'Menu';
  };
  attributes: {
    category: Schema.Attribute.String;
    content: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SharedNav extends Struct.ComponentSchema {
  collectionName: 'components_shared_navs';
  info: {
    displayName: 'Nav';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', false>;
    menuZone: Schema.Attribute.Relation<'oneToOne', 'api::menu-zone.menu-zone'>;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['link', 'menu']>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    cover: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.footer': LayoutFooter;
      'layout.navbar': LayoutNavbar;
      'shared.body': SharedBody;
      'shared.image': SharedImage;
      'shared.link': SharedLink;
      'shared.markdown': SharedMarkdown;
      'shared.menu': SharedMenu;
      'shared.nav': SharedNav;
      'shared.seo': SharedSeo;
      'shared.video': SharedVideo;
    }
  }
}
