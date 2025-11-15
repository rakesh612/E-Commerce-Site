import Redis from "ioredis";
import dotenv from 'dotenv';


dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {
    rejectUnauthorized: false, // 👈 must be inside tls
      maxRetriesPerRequest: 5,    // retry few times before failing
  reconnectOnError: () => true
  },
});



