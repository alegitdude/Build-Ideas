import LogoBar from "../LogoBar";
import PasswordForm from "../PasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="reset-page-container">
      <LogoBar />
      <PasswordForm state="reset" />
    </div>
  );
};
export default ResetPasswordPage;
