import { useForm } from "react-hook-form";
import db from "../lib/db";
import { useRouter } from "next/router";

interface FormValues {
  email: string;
  password: string;
  name: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(data.password, salt);
    // await db.user.create({
    //   data: {
    //     email: data.email,
    //     password: hashedPassword,
    //     name: data.name,
    //   },
    // });
    // router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" ref={register({ required: "Email is required" })} />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        name="password"
        type="password"
        ref={register({ required: "Password is required" })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <input name="name" ref={register({ required: "Name is required" })} />
      {errors.name && <p>{errors.name.message}</p>}

      <input type="submit" />
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = withSession(
  async function ({ req, res }) {
    const user: Session = req.session.get("user");

    if (user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);
