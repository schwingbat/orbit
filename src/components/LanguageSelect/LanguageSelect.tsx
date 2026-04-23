import { Context, forEach } from "@manyducks.co/dolla";
import { getTranslate } from "@manyducks.co/dolla/translate";

import styles from "./LanguageSelect.module.css";

const localeNames: Record<string, string> = {
  en: "English",
  ja: "日本語",
  ja_kana: "にほんご",
};

export function LanguageSelect(this: Context) {
  const { currentLocale, setLocale, supportedLocales, t } = getTranslate(this);

  return (
    <div class={styles.container}>
      <label class={styles.label} for="language">
        {t("language")}
      </label>
      <select
        id="language"
        class={styles.select}
        onChange={(e) => {
          const target = e.currentTarget as HTMLSelectElement;
          setLocale(target.value);
        }}
      >
        {forEach(
          supportedLocales,
          (locale) => locale,
          (locale) => (
            <option
              value={locale}
              selected={() => currentLocale() === locale()}
            >
              {() => localeNames[locale()]}
            </option>
          ),
        )}
        {/* <For each={supportedLocales}>
          {(locale) => (
            <option
              value={locale}
              selected={() => currentLocale.track() === locale.track()}
            >
              {() => localeNames[locale.track()]}
            </option>
          )}
        </For> */}
      </select>
    </div>
  );
}
