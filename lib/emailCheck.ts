import dns from "dns/promises";

/**
 * Checks if the email domain has MX records (can receive emails)
 * @param email full email string (e.g. user@gmail.com)
 * @returns true if domain exists and can receive email
 */
export async function hasMXRecord(email: string): Promise<boolean> {
  try {
    // Extract domain part
    const domain = email.split("@")[1];

    if (!domain) return false;

    // Ask DNS for mail servers
    const records = await dns.resolveMx(domain);

    return Array.isArray(records) && records.length > 0;
  } catch (err) {
    // Any DNS failure = invalid domain
    return false;
  }
}
