import * as React from "react";
import Layout from "../components/Layout";

interface Props {}

const About: React.FC<Props> = props => {
  return (
    <Layout>
      <p>This is the about page</p>
    </Layout>
  );
};

export default About;
