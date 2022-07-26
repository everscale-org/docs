import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: '🧰 Start Building',
    description: 'Get started building scalable and decentralized App',
    link: 'develop',
  },
  {
    title: '🗳️ Run a Validator Node',
    description: 'Validate transactions, secure the network, and earn rewards',
    link: 'validate',
  },
  {
    title: 'Create a Token 🪙 TIP-3 or 🎨 TIP-4',
    description: 'Launch your own Fungible and Non-Fungible Token Everscale equivalent of ERC-20/ERC-721',
    link: 'develop/smart-digital-assets',
  },
  {
    title: '🏧 Integrate an Exchange',
    description: 'Follow our extensive integration guide to ensure a seamless user experience',
    link: 'develop/integrate',
  },
  {
    title: '🔑 Manage a Wallet',
    description: 'Create a wallet, check your balance, and learn about wallet options',
    link: 'learn/everscale-overview/exchangewallets',
  },
  {
    title: '🎓 Learn How Everscale Works',
    description: 'Get a high-level understanding of Everscale architecture',
    link: 'learn',
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <Link className="navbar__link" to={link}>
        <div className="card">
          <div className="card__header">
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row cards__container">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
