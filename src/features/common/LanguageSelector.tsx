import { useMemo } from 'react';
import { ActionIcon, Avatar, Menu } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../utils/constants';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const icon = useMemo(
    () => <Avatar src={`/static/flags/${i18n.language}.png`} size='sm' />,
    [i18n.language]
  );

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant='light' size='lg'>
          {icon}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {supportedLanguages.map((language, index) => (
          <Menu.Item
            key={index}
            icon={
              <Avatar src={`/static/flags/${language.code}.png`} size={'sm'} />
            }
            onClick={() => i18n.changeLanguage(language.code)}
          >
            {t(`Language.${language.name}`)}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSelector;
