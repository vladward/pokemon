import { getTranslations } from 'next-intl/server';

export default async function SkillsPage() {
  const t = await getTranslations('pages');
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
      <h1 className="text-[3rem] font-bold text-lightBlue mb-4">{t('skills.title')}</h1>
      <p className="text-[1.1rem] max-w-[500px]">{t('skills.description')}</p>
    </div>
  );
}
