import Link from 'next/link';
import css from './ProfilPage.module.css';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProfilePage',
  description: 'Your personal data and security settings',
  openGraph: {
    title: 'ProfilePage',
    description: 'Your personal data and security settings',
    url: '#',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'ProfilePage Open Graph Image',
      },
    ],
  },
};

export default function ProfilePage() {
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link
              href="/app/(private routes)/profile/edit"
              className={css.editProfileButton}
            >
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="{user.avatar}"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
}
