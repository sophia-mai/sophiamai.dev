'use client';

import {useEffect,useState} from 'react';

export default function VisitorCounter() {
  const [count,setCount] = useState<number|null>(null);
  useEffect(() => {
    let active = true;
    async function update(register = false) {
      try {
        let visitorId: string|null = null;
        if (register) {
          visitorId = localStorage.getItem('scrapbook-visitor');
          if (!visitorId || !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(visitorId)) {
            visitorId = crypto.randomUUID();
            localStorage.setItem('scrapbook-visitor',visitorId);
          }
        }
        const response = await fetch('/api/visitors', {
          method: register ? 'POST' : 'GET',
          ...(register && {headers: {'Content-Type':'application/json'},body: JSON.stringify({visitorId})}),
          cache: 'no-store',
        });
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (active && typeof data === 'object' && data !== null && 'count' in data && typeof data.count === 'number' && Number.isSafeInteger(data.count) && data.count >= 0) setCount(data.count);
      } catch {
        // Keep the page usable when storage or the counter service is unavailable.
      }
    }
    void update(true);
    const timer = setInterval(() => {if (document.visibilityState === 'visible') void update();},60000);
    return () => {active = false;clearInterval(timer);};
  },[]);
  return <span title="Unique browsers; return visits from the same browser count once." aria-live="polite">visitors <b>{count === null ? '—' : String(count).padStart(6,'0')}</b></span>;
}
