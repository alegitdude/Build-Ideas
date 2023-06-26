import LogoBar from "../LogoBar";
import PasswordForm from "../PasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="reset-page-container">
      <LogoBar />
      <PasswordForm state="forgot" />
    </div>
  );
};
export default ForgotPasswordPage;
