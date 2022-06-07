/** @format */

import { useFormik } from "formik";
import * as yup from "yup";
import * as axios from "axios";

// Página de Login

function LogoPage() {
  return (
    <div className="sm:bg-birdBlue sm:flex sm:flex-col sm:items-center sm:justify-center
                    lg:bg-birdBlue lg:w-1/2 lg:h-screen lg:flex lg:items-center lg:justify-center">
        <svg
          className="sm:w-15 sm:h-20 sm:m-5
                     lg:h-full"
          width="359"
          height="290"
          viewBox="0 0 359 290"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M77.2844 241.659L78.0496 242.423L100.24 182.402L87.9971 170.635L68.4847 150.882C65.4239 147.826 
                65.4239 143.279 68.4847 140.261L118.987 90.1354C122.048 87.079 122.048 82.5325 118.987 79.5143L88.3797 49.1408C85.3189 
                46.0843 80.7277 46.0843 77.667 49.1408L15.6864 110.69C6.12154 119.439 0 131.971 0 145.648C0 158.562 5.35634 170.329 13.7735 
                178.696L77.2844 241.659ZM140.834 289.301L98.2506 270.657C94.5395 268.899 92.4734 264.582 94.2716 260.456L206.64 4.63125C208.4 
                0.9253 212.723 -1.13781 216.855 0.657858L259.438 19.3022C263.149 21.0597 265.216 25.3769 263.417 29.5031L151.049 285.328C149.289 
                289.416 144.583 291.059 140.834 289.301ZM344.719 111.378L281.591 47.9564L280.443 46.8102L258.252 106.793L270.878 119.401L290.773 
                139.268C293.834 142.324 293.834 146.909 290.773 149.965L239.505 200.397C236.444 203.453 236.444 208.038 239.505 211.094L270.113 
                241.659C273.173 244.715 277.765 244.715 280.825 241.659L342.806 179.766C352.371 170.978 358.492 158.371 358.492 144.617C358.492 
                131.627 353.136 119.783 344.719 111.378Z"
            fill="#15202B"
          />
        </svg>
    </div>
  );
}

const Input = (props) => (
  <input
    {...props}
    className="bg-transparent rounded-md p-2  border  border-onix outline-none focus:border-platinum"
  />
);

const validationSchema = yup.object({
  email: yup.string().required("Digite seu e-mail:").email("E-mail inválido"),
  password: yup.string().required("Digite sua senha:"),
});

function FormPage({ signInUser }) {
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
        auth: {
          username: values.email,
          password: values.password,
        },
      });

      signInUser(res.data);
    },
    initialValues: {
      email: "",
      password: "",
    },
    validateOnMount: true,
    validationSchema,
  });

  return (
    <div
      className="sm:flex sm:flex-col sm:items-center sm:justify-center
                 lg:flex lg:space-y-6 lg:items-center lg:m-auto lg:flex-col"
        >
        <form
          className="sm:flex sm:flex-col sm:items-center sm:mt-20 sm:space-y-5 
                     lg:m-2 lg:flex lg:flex-col lg:space-y-5 lg:items-center"
          onSubmit={formik.handleSubmit}
        >
          <span className="text-platinum text-4xl font-bold">Fazer Login</span>

          <div className="space-y-1">
            <Input
              type="text"
              name="email"
              placeholder="E-mail ou nome de usuário"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-sm text-platinum pt-1 uppercase">
                {" "}
                {formik.errors.email}{" "}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-platinum pt-1 uppercase">
                {" "}
                {formik.errors.password}{" "}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-birdBlue text-platinum px-5 py-2 disabled:opacity-50 rounded-full w-full text-xl font-bold"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? "Enviando..." : "Entrar"}
          </button>
        </form>

        <span className="text-silver flex items-center sm:mt-2">
          {" "}
          Não tem uma conta?
          <a className="text-birdBlue text-sm p-1" href="/signup">
            Inscreva-se
          </a>
        </span>
    </div>
  );
}

export function Login({ signInUser }) {
  return (
    <>
      <div className="sm:flex sm:flex-col">
        <div className="lg:flex">
          <LogoPage />
          <FormPage signInUser={signInUser} />
        </div>
      </div>
    </>
  );
}
