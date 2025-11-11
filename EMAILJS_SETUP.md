# EmailJS Setup Guide for Contact Form

Your contact form is now configured to send emails to **harshitanagesh4@gmail.com** when visitors submit messages. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (it's free - 200 emails/month)
3. Verify your email address

## Step 2: Connect Your Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (since you're using @gmail.com)
4. Click **Connect Account** and sign in with `harshitanagesh4@gmail.com`
5. After connecting, copy your **Service ID** (looks like `service_xxxxxxx`)
6. Save it

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template configuration:

**Template Name:** `Contact Form Message`

**Subject:** `New Contact Form Message from {{user_name}}`

**Content (Email Body):**
```
Hello Harshita,

You have a new message from your portfolio website!

From: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Click **Save**
5. Copy your **Template ID** (looks like `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (looks like a long random string)
3. Copy it

## Step 5: Add Credentials to .env File

Open your `.env` file and replace the placeholder values:

```env
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
```

## Step 6: Restart Your Dev Server

After updating the `.env` file, restart your development server for changes to take effect.

## That's It! 🎉

Now when someone fills out your contact form:
1. They enter their name, email, and message
2. Click "TRANSMIT_MESSAGE()"
3. You receive an email at **harshitanagesh4@gmail.com** with their message
4. They see a success confirmation

## Testing

1. Go to your website's contact section
2. Fill out the form with test data
3. Submit it
4. Check **harshitanagesh4@gmail.com** inbox for the email
5. You should receive it within seconds!

## Troubleshooting

- **Not receiving emails?** Check your Gmail spam folder
- **Error on submit?** Verify all three credentials in `.env` are correct
- **Still not working?** Check the browser console for error messages

## Security Note

Your EmailJS public key will be visible in the browser (this is normal and safe). EmailJS protects against abuse by:
- Rate limiting (max emails per day)
- Domain restrictions (configure allowed domains in EmailJS dashboard)
- CAPTCHA options available if needed
