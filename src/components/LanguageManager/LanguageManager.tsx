import { ReactNode, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import * as locales from "@/locales";
import { useActiveLanguage } from "@/hooks";

export type Props = {
  children: ReactNode;
};

export const LanguageManager = ({ children }: Props) => {
  const [messages, setMessages] = useState(locales.fr);
  const activeLanguage = useActiveLanguage();

  useEffect(() => {
    type LanguageKeys = keyof typeof locales;
    setMessages(
      locales[activeLanguage.languages[0] as LanguageKeys] ?? locales.fr
    );
  }, [activeLanguage.code]);
  return (
    <IntlProvider
      messages={messages}
      locale={activeLanguage.languages[0]}
      defaultLocale="fr"
    >
      {children}
    </IntlProvider>
  );
};
