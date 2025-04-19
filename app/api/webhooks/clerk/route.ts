import prisma from '@/lib/db';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(req: NextRequest) {
  // Get the webhook signature from the request headers
  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  // If there's no signature, return an error
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Missing svix headers', { status: 400 });
  }

  // Get the webhook secret from environment variables
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new NextResponse('Webhook secret not configured', { status: 500 });
  }

  // Get the raw body of the request
  const payload = await req.text();

  // Create a new Svix instance with the webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the webhook signature
  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  // Handle the webhook event based on its type
  try {
    const eventType = evt.type;

    // User created event
    if (eventType === 'user.created') {
      const { id, email_addresses } = evt.data;
      
      // Create user in database
      if (id && email_addresses && email_addresses.length > 0) {
        await prisma.user.create({
          data: {
            id,
            email: email_addresses[0].email_address,
          },
        });
        
        console.log(`User created: ${id}`);
      }
    }
    
    // User updated event
    else if (eventType === 'user.updated') {
      const { id, email_addresses } = evt.data;
      
      // Update user in database
      if (id && email_addresses && email_addresses.length > 0) {
        await prisma.user.update({
          where: { id },
          data: {
            email: email_addresses[0].email_address,
          },
        });
        
        console.log(`User updated: ${id}`);
      }
    }
    
    // User deleted event
    else if (eventType === 'user.deleted') {
      const { id } = evt.data;
      
      // Delete user from database
      if (id) {
        await prisma.user.delete({
          where: { id },
        });
        
        console.log(`User deleted: ${id}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to handle webhook' },
      { status: 500 }
    );
  }
}
