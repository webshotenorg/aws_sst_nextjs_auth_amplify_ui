import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Authenticator, translations } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { I18n } from 'aws-amplify/utils';
import { ReactNode } from 'react';
import './customize-authenticator.css';

export const initAmplifyAuthentication = () => {
  // Cognitoの設定
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
        identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || '',
      },
    },
  });
  // 日本語翻訳の設定
  const jaDict = {
    'Sign In': 'ログイン',
    'Sign Up': '新規登録',
    Email: 'メールアドレス',
    Password: 'パスワード',
    'Forgot your password?': 'パスワードをお忘れですか？',
    'Reset Password': 'パスワードをリセット',
    'Confirm Password': 'パスワードの確認',
    'Your passwords must match': 'パスワードが一致していません',
    'Enter your code': '確認コードを入力',
    'Create Account': 'アカウント作成',
    Confirm: '確認',
    'Back to Sign In': 'ログインに戻る',
    Username: 'ユーザー名',
    'Confirm a Code': 'コードを確認',
    'Resend Code': 'コードを再送信',
    Submit: '送信',
    'Incorrect username or password':
      'ユーザー名またはパスワードが正しくありません',
  };
  I18n.putVocabularies(translations);
  I18n.setLanguage('ja');
  I18n.putVocabularies({
    ja: jaDict,
  });
};

export const AuthenticatorWrapper = ({ children }: { children: ReactNode }) => {
  if (!Amplify.getConfig().Auth) {
    <>need initialize amplify authenticator</>;
  }

  return (
    <Authenticator
      variation="modal"
      socialProviders={[]}
      initialState="signIn"
      components={{
        Header() {
          return (
            <div className="flex justify-center mb-6">{/* <Logo /> */}</div>
          );
        },
        // Footer() {
        //   return (
        //     <div className="text-center text-sm text-gray-500 mt-6">
        //       &copy; {new Date().getFullYear()} サービス名
        //     </div>
        //   );
        // },
        SignIn: {
          Header() {
            return (
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
              </CardHeader>
            );
          },
        },
        SignUp: {
          Header() {
            return (
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">新規登録</CardTitle>
              </CardHeader>
            );
          },
        },
        ForgotPassword: {
          Header() {
            return (
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">
                  パスワードリセット
                </CardTitle>
              </CardHeader>
            );
          },
        },
        ConfirmResetPassword: {
          Header() {
            return (
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">
                  パスワード再設定
                </CardTitle>
              </CardHeader>
            );
          },
        },
        ConfirmSignUp: {
          Header() {
            return (
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">
                  アカウント確認
                </CardTitle>
              </CardHeader>
            );
          },
        },
      }}
    >
      {({}) => (
        <Card className="border shadow-lg">
          <CardContent className="p-6">
            {children}
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Sign Out
            </button>
          </CardContent>
        </Card>
      )}
    </Authenticator>
  );
};
