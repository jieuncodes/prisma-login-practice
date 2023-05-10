import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session/edge";

export const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getIronSession(req, res, {
    cookieName: "jieuncodesloginsession",
    password: process.env.COOKIE_PASSWORD!,
  });
  return session;
};

export const withApiSession = (
  handler: (
    req: any,
    res: any,
    session: NextApiRequest["session"]
  ) => Promise<void>
) => {
  return async (req: any, res: any) => {
    const session = await getSession(req, res);
    return handler(req, res, session);
  };
};
