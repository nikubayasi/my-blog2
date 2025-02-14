import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Svix インスタンス作成
  const wh = new Webhook(SIGNING_SECRET);

  // ヘッダー取得
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // 必須ヘッダーがない場合、エラー
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // リクエストの JSON 取得
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // Webhook の検証
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  // Webhook のイベントログ
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  if (evt.type === 'user.created') {
    console.log('userId:', evt.data.id)
  }
  if (evt.type === 'user.updated') {
    console.log('user is updated:', evt.data.id)
  }

  return new Response("Webhook received", { status: 200 });
}
