const key = `sophiamai:visitors:${process.env.VERCEL_ENV || 'development'}`;
const headers = {'Cache-Control':'no-store'};

async function counter(command: (string|number)[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return Response.json({error:'Counter unavailable'},{status:503,headers});
  try {
    const response = await fetch(url, {
      method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
      body:JSON.stringify(command),cache:'no-store',signal:AbortSignal.timeout(5000),
    });
    const data: unknown = await response.json();
    if (!response.ok || typeof data !== 'object' || data === null || !('result' in data) || typeof data.result !== 'number' || !Number.isSafeInteger(data.result) || data.result < 0) throw new Error('Invalid counter response');
    return Response.json({count:data.result},{headers});
  } catch {
    return Response.json({error:'Counter unavailable'},{status:503,headers});
  }
}

export async function GET() {
  return counter(['SCARD',key]);
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') return Response.json({error:'Forbidden'},{status:403,headers});
  if (!request.headers.get('content-type')?.startsWith('application/json')) return Response.json({error:'Expected JSON'},{status:415,headers});
  let data: unknown;
  try {data = await request.json();} catch {return Response.json({error:'Invalid visitor'},{status:400,headers});}
  if (typeof data !== 'object' || data === null || !('visitorId' in data) || typeof data.visitorId !== 'string' || !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(data.visitorId)) return Response.json({error:'Invalid visitor'},{status:400,headers});
  return counter(['EVAL',"redis.call('SADD', KEYS[1], ARGV[1]); return redis.call('SCARD', KEYS[1])",1,key,data.visitorId.toLowerCase()]);
}
