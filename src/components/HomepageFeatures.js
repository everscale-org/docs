import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Complexless',
    Svg: require('../../static/img/complexless.svg').default,
    description: (
      <>
        Cryptography and mathematics are complex, but they can be used simply and where it is really needed
      </>
    ),
  },
  {
    title: 'Community',
    Svg: require('../../static/img/community.svg').default,
    description: (
      <>
        We understand the importance of community and strive to create a comfortable environment for your projects
      </>
    ),
  },
  {
    title: 'Support',
    Svg: require('../../static/img/support.svg').default,
    description: (
      <>
        It is difficult to open new frontiers alone, we understand this and are ready to support you
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
