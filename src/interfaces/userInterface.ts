export interface ITelegramUser {
  tgWebAppData: ITelegramWebAppData;
  tgWebAppPlatform: string;
  tgWebAppThemeParams: ITelegramAppThemeParams;
  tgWebAppVersion: string;
  regionIndex: number;
}

interface ITelegramWebAppData {
  auth_date: string;
  chat_instance: string;
  chat_type: string;
  hash: string;
  signature: string;
  user: {
    allows_write_to_pm: boolean;
    first_name: string;
    id: number;
    language_code: string;
    last_name: string;
    photo_url: string;
    username: string;
  };
}

interface ITelegramAppThemeParams {
  accent_text_color: string;
  bg_color: string;
  bottom_bar_bg_color: string;
  button_color: string;
  button_text_color: string;
  destructive_text_color: string;
  header_bg_color: string;
  hint_color: string;
  link_color: string;
  secondary_bg_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  section_separator_color: string;
  subtitle_text_color: string;
  text_color: string;
}

export interface IQuestion {
  id: number;
  title: string;
  question: string;
  options: QuestionOption[];
  multiSelect: boolean;
  category: string;
  imageUrl?: string;
}

interface QuestionOption {
  id: number;
  text: string;
}

export interface IAnswer {
  questionId: number;
  optionId: number;
  userId: number;
}

export interface IForAddNewQuestion {
  answer: string[];
  category: string;
  imageUrl?: string;
  isRecurring: boolean;
  multiSelect: boolean;
  question: string;
  title: string;
}
