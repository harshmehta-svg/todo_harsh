// src/services/analytics.service.ts

import { createEventContext, EventContext, eventTracker } from './event-tracker';
import { useUserHook } from '../hooks/user.hook';
import { useCompanyHook } from '../hooks/company.hook';
import { useRegionHook } from '../hooks/region.hook';

export const useAnalytics = () => {
  const user = useUserHook();
  const company = useCompanyHook();
  const region = useRegionHook();

  const context = createEventContext({
    user: user.data,
    company: company.data,
    region: region.data,
  });

  const trackEvent = (event: string) => {
    eventTracker(trackEventName(event), context, arguments);
  };

  const trackEventName = (event: string) => {
    return `app.${event}`;
  };

  return { trackEvent };
};