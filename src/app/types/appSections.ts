export interface Section {
  id?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  actionText?: string;
  secondaryActionText?: string;
  image?: string;
  catalog?: Section[];
  isMenu?: boolean;
  isQueryParam?: boolean;
  showDescription?: boolean;
  formFields?: FormField[];
  links?: SectionLink[];
  navLinkFocused?: boolean;
  animate?: boolean;
  email?: EmailDetails;
  phoneNumber?: String;
}

interface EmailDetails {
  subject: string;
  success_message?: string;
  error_message?: string;
  warning_message?: string;
}
export interface SectionLink {
  name?: string;
  link?: string;
  icon?: string;
}

interface FormField {
  id: string;
  name: string;
  type: FieldType | string;
  inputType?: InputType | string;
  required?: boolean;
  value?: string;
}

export enum FieldType {
  InputText = 'input-text',
  Textarea = 'textarea',
}

enum InputType {
  Text = 'text',
  Email = 'email',
}

export enum SectionEnum {
  Home = 'home',
  WhatWeDo = 'what-we-do',
  WhoTrustUs = 'who-trust-us',
  Statistics = 'statistics',
  Services = 'services',
  About = 'about',
  WhoWeAre = 'who-we-are',
  OurStory = 'our-story',
  OurTeam = 'our-team',
  Location = 'location',
  Dreams = 'dreams',
  GetInTouch = 'get-in-touch',
  InfoFooter = 'info-footer',
  Cookies = 'cookies',
  GetInTouchNavLink = 'get-in-touch-nav-link',
  WhatsAppNavLink = 'whatsapp-nav-link',
  Brochure = 'brochure',
}

export enum LanguageEnum {
  En = 'en',
  Es = 'es',
}

export enum NavigationEnum {
  SelectedRoute = 'selected-route',
  SelectedLanguage = 'selected-language',
}
