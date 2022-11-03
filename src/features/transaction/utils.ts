import i18next from 'i18next';
import { Category } from '../../models/common';

export const getTranslatedCategory = (category: Category) =>
  category.code ? i18next.t(`Value.${category.code}`) : category.name;
