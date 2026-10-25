# Azure Speech setup (for the scoring spike)

About 15 minutes. You do these steps yourself; Claude can't create accounts or enter card details.

## 1. Create an Azure account
1. Go to https://azure.microsoft.com/free and sign up with a Microsoft account.
2. Azure asks for a phone number and a card to verify your identity. The free tier doesn't charge it.

## 2. Create a Speech resource
1. In the Azure portal (https://portal.azure.com), click **Create a resource** and search for **Speech**. Pick Microsoft's **Speech** service (it may be listed under Azure AI services or Foundry Tools).
2. Fill in:
   - **Subscription:** your free or pay-as-you-go subscription
   - **Resource group:** create new, `accento-spike` (makes it easy to delete everything later)
   - **Region:** `Central India`
   - **Name:** something unique, e.g. `accento-speech-sb`
   - **Pricing tier:** **Free F0**. It can't run up charges, and it covers far more audio than the spike needs.
3. Click **Review + create**, then **Create**. Wait for "Your deployment is complete" and click **Go to resource**.

If Free F0 isn't offered (you can only have one per subscription), choose Standard S0 and set a budget alert under **Cost Management → Budgets** (for example, $5). The spike should cost well under $1.

## 3. Copy the key and region into `.env.local`
1. In the resource, open **Keys and Endpoint** (under Resource Management).
2. In Terminal, from the project folder:
   ```bash
   cp .env.example .env.local
   ```
3. Open `.env.local` in a text editor and fill in:
   ```
   AZURE_SPEECH_KEY=<KEY 1 from the portal>
   AZURE_SPEECH_REGION=centralindia
   ```
4. Save it. `.env.local` is ignored by git, so it never gets committed.

**Don't paste the key into the chat.** Tell Claude "the key is in .env.local". Claude will run a test call that only reports whether Azure accepted the key, never the key itself.

## After the spike
Delete the `accento-spike` resource group in the portal if we stop using Azure. That removes the Speech resource and its key.
