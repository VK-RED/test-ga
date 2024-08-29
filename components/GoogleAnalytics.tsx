"use client";

import Script from 'next/script';

interface GoogleEvent{
    action:string;
    category:string;
    label:string;
    value:string;
}

export const registerEvent = (data:GoogleEvent) => {
    (window as any).gtag('event', data.action, {
        event_category: data.category,
        event_label: data.label,
        value: data.value,
    });
}

export const pageview = (url:string) => {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_MEASUREMENT_ID as string, {
      page_path: url,
    });
  };

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};
