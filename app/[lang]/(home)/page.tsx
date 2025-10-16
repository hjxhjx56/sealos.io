import dynamic from 'next/dynamic';
import Trusted from './components/trusted';
import WhyChooseUs from './components/why-choose-us';
import ProblemsAndSolutions from './components/problems-solutions';
import HeroBenefits from './components/hero-benefits';
import SixthScreen from './components/sixth-screen';
import FAQSection from '@/components/ui/faq-section';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/header/hero';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { appDomain } from '@/config/site';
import RedirectSuggest from '@/components/redirectSuggest';
import { languagesType } from '@/lib/i18n';
import ScrollProgressWrapper from '@/components/scroll-progress-wrapper';
import { CallToActionSection } from '@/components/ui/call-to-action-section';
import HorizonImageFade from './components/horizon-image-fade';

// Dynamic imports for heavy components
const Desktop = dynamic(() => import('./components/desktop'), {
  loading: () => (
    <div className="flex min-h-[600px] items-center justify-center">
      <div className="animate-pulse text-gray-500">
        Loading desktop experience...
      </div>
    </div>
  ),
  ssr: false,
});


const WorkflowShowcase = dynamic(
  () => import('./components/workflow-showcase'),
  {
    loading: () => <div className="min-h-[400px]" />,
  },
);

const DevBoxShowcase = dynamic(() => import('./components/devbox-showcase'), {
  loading: () => <div className="min-h-[600px]" />,
});

// Define translations only for strings used directly in this component
const translations = {
  en: {
    title: {
      main: 'End Cloud Complexity. Start Building.',
      sub: 'Enterprise-grade infrastructure as simple as your desktop',
    },
    desktop: {
      title: 'Experience Sealos Cloud OS',
      description:
        'Try Sealos interactive desktop experience. Click on modules to explore their features, drag windows around, and resize them just like a real desktop environment.',
    },
  },
  'zh-cn': {
    title: {
      main: '终结云复杂性，开始构建',
      sub: '企业级基础设施，如桌面般简单',
    },
    desktop: {
      title: '体验 Sealos 云操作系统',
      description:
        '尝试 Sealos 的交互式桌面体验。点击模块探索其功能，拖拽窗口，就像真实的桌面环境一样调整大小。',
    },
  },
};

export default function HomePage({
  params,
}: {
  params: { lang: languagesType };
}) {
  const t = translations[params.lang] || translations.en;

  return (
    <div className="h-full bg-[#EBF2FF]">
      <Header lang={params.lang} />
      <ScrollProgressWrapper />

      <main className="custom-container px-4 pt-14 pb-20 md:px-[5%]">
        <Hero
          title={t.title}
          mainTitleEmphasis={2}
          getStartedLink={appDomain}
          lang={params.lang}
        >
          <div className="mx-auto hidden max-w-7xl sm:block">
            <Desktop />
          </div>

          <div className="mt-12">
            <HeroBenefits lang={params.lang} />
          </div>
        </Hero>
      </main>

      <div className="space-y-20">
        <div className="custom-container px-4 md:px-[5%]">
          <ProblemsAndSolutions lang={params.lang} />
        </div>

        <div className="custom-container px-4 md:px-[5%]">
          <DevBoxShowcase lang={params.lang} />
        </div>

        <div className="custom-container px-4 md:px-[5%]">
          <Trusted lang={params.lang} />
        </div>

        <div className="custom-container px-4 md:px-[5%]">
          <WorkflowShowcase lang={params.lang} />
        </div>

        <div className="custom-container px-4 md:px-[5%]">
          <WhyChooseUs lang={params.lang} />
        </div>

        <div className="custom-container px-4 md:px-[5%]">
          <CallToActionSection
            title="Develop, Build, Deploy, and Scale Without Limits"
            buttonText="Get Started"
          />
        </div>
      </div>

      {/* 第六屏、七屏与页脚 - 整体统一黑色背景 */}
      <div className="bg-black">
        <div className="site-shell">
          <SixthScreen lang={params.lang} />
        </div>
        <FAQSection />
        {/* 第七屏与页脚之间的 Horizon 图层 */}
        <div className="relative bg-black">
          <HorizonImageFade />
          <div className="h-[500px]"></div>
        </div>
        <div className="relative z-50">
          <Footer lang={params.lang} />
        </div>
      </div>
      <TailwindIndicator />
      <RedirectSuggest />
    </div>
  );
}
