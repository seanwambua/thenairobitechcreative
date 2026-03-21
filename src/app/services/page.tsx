import ServicesClient from './services-client';
import { getComments } from '@/lib/actions/comments';

export default async function ServicesPage() {
  const comments = await getComments(0); // Using a placeholder ID for services page feedback
  return <ServicesClient comments={comments} />;
}
