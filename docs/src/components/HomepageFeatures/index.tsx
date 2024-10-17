import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Practical Learning Experience',
    Svg: require('@site/static/img/undraw_virtual_reality.svg').default,
    description: (
      <>
        IITB Simulations offer an immersive, hands-on approach to learning,
        allowing participants to apply theoretical concepts in a practical,
        controlled environment.
      </>
    ),
  },
  {
    title: 'Realistic Scenarios',
    Svg: require('@site/static/img/undraw_engineering_team.svg').default,
    description: (
      <>
        Engage with realistic, industry-relevant scenarios that replicate
        real-world challenges in operations, supply chain, and resource
        management, preparing you for future professional tasks.
      </>
    ),
  },
  {
    title: 'Collaboration & Strategy',
    Svg: require('@site/static/img/undraw_teamwork.svg').default,
    description: (
      <>
        Enhance your skills in strategic decision-making and teamwork. IITB
        Simulations encourage collaboration, where participants coordinate and
        communicate to achieve shared goals effectively.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
