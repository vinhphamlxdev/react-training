import * as React from "react";
import { styled } from "styled-components";
import * as Yup from "yup";
import bg from "../../assets/bgsignup.jpg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Field } from "../../components/Field";
import { Input } from "../../components/Input";
import useDisabled from "../../Hooks/useDisabled";
export const backgroundImageStyle = {
  backgroundImage: `url(${bg})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100vw",
};

const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schemaValidate = Yup.object({
  fullName: Yup.string().required("Please enter your full name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      REGEX_PASSWORD,
      "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters"
    ),
  passwordConfirm: Yup.string()
    .required("Please enter your password confirm!")
    .oneOf([Yup.ref("password")], "Confirmation password does not match!"),
});
export default function SignUp() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  console.log(errors);
  const handleSignUp = (data) => {
    console.log(data);
  };
  const { disabledStyle, isDisabled } = useDisabled(isSubmitting);
  return (
    <div
      style={backgroundImageStyle}
      className="inset-0 bg-white relative  bg-signup gap-x-5"
    >
      {/* {isLoading && <LoadingSpinner />} */}
      <div className="absolute px-10 left-10 top-5  py-10">
        <div></div>
      </div>
      <div className="wrapper-layout section">
        <div className="flex h-screen justify-center items-center">
          <div className="px-4 shadow-md py-6 flex flex-col w-[450px] sign-up-form  rounded-md bg-white">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col form-control  mt-4"
            >
              <div className="form-control__list">
                <div className="relative">
                  <Field>
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      control={control}
                      error={errors.fullName?.message}
                    />
                  </Field>
                </div>
                <div className="relative">
                  <Field>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      control={control}
                      error={errors.email?.message}
                    />
                  </Field>
                </div>
                <div className="relative">
                  <Field>
                    <Input
                      type="text"
                      name="password"
                      placeholder="Password"
                      control={control}
                      error={errors.password?.message}
                    />
                  </Field>
                  {/* <i
                        onClick={() => setShowPassword()}
                        className={`bi absolute ${
                          showPassword ? "bi-eye" : "bi-eye-slash"
                        }  right-2 text-base cursor-pointer ${
                          signupFormik.errors.password ? "top-5" : "top-2/4"
                        }  -translate-y-2/4`}
                      ></i> */}
                </div>
                <div className="relative">
                  <Field>
                    <Input
                      type="text"
                      name="passwordConfirm"
                      placeholder="Password confirm"
                      control={control}
                      error={errors.passwordConfirm?.message}
                    />
                  </Field>
                  {/* <i
                        onClick={() => setShowPassword()}
                        className={`bi absolute ${
                          showPassword ? "bi-eye" : "bi-eye-slash"
                        }  right-2 text-base cursor-pointer ${
                          signupFormik.errors.password ? "top-5" : "top-2/4"
                        }  -translate-y-2/4`}
                      ></i> */}
                </div>
              </div>
              <button
                type="submit"
                // disabled={isDisabled}
                // style={disabledStyle}
                className="h-[50px] bg-bgCheckout whitespace-nowrap w-full bg-blue-500 text-white font-light rounded-md text-base undefined"
              >
                Đăng Kí
              </button>

              <div className="mt-3 flex items-center gap-x-3">
                <span className="text-textPrimary font-light">
                  Bạn đã có tài khoản?
                </span>
                <div
                  className="italic text-blue-500 text-sm cursor-pointer underline font-light"
                  //   href="/signin"
                >
                  Đăng Nhập
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
