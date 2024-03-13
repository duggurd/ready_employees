export default async function handler(req, res) {

  const architectEp = process.env.NEXT_PUBLIC_ARCHITECT_ENDPOINT;

  const response =  await fetch(architectEp + '/birthdays');
  const birthdays = await response.json()

  res.status(200).json(birthdays);
}