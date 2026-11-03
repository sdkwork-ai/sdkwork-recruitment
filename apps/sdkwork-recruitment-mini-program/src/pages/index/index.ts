import { integratedComponents, type IntegratedComponent } from '../../composition/components';

type MiniComponent = IntegratedComponent & { mark: string };

type PageData = {
  appName: string;
  appCode: string;
  linkedCount: number;
  plannedCount: number;
  components: readonly MiniComponent[];
};

const linkedCount = integratedComponents.filter((component) => component.supported).length;
const components: MiniComponent[] = integratedComponents.map((component) => ({
  ...component,
  mark: component.id.slice(0, 2).toUpperCase(),
}));

Page({
  data: {
    appName: 'SDKWork Recruitment',
    appCode: 'sdkwork-recruitment',
    linkedCount,
    plannedCount: integratedComponents.length - linkedCount,
    components,
  } satisfies PageData,
});
