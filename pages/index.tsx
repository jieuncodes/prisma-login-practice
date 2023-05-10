import { NextApiRequest, NextApiResponse, NextPage } from "next";
import { getSession } from "../lib/server/session";

export const Home: NextPage = () => {
  return <></>;
};

export const getServerSideProps = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession(req, res);

  const user = session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/join",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

export default Home;
