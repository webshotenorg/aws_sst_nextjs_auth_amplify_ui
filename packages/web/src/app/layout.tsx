'use client';

import { Logo } from '@/components/logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Authenticator,
  ThemeProvider,
  translations,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import type React from 'react';
import './globals.css';

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

// カスタムテーマの設定
const theme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: '#f0f9ff' }, // blue-50
          20: { value: '#e0f2fe' }, // blue-100
          40: { value: '#bae6fd' }, // blue-200
          60: { value: '#7dd3fc' }, // blue-300
          80: { value: '#38bdf8' }, // blue-400
          90: { value: '#0ea5e9' }, // blue-500
          100: { value: '#0284c7' }, // blue-600
        },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '{colors.brand.primary.90}' },
          _hover: {
            backgroundColor: { value: '{colors.brand.primary.100}' },
          },
        },
      },
      fieldcontrol: {
        borderRadius: { value: '0.5rem' },
      },
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <div className="flex justify-center items-center min-h-screen py-8 px-4">
          <div className="w-full max-w-md">
            <ThemeProvider theme={theme}>
              <Authenticator
                variation="modal"
                socialProviders={[]}
                initialState="signIn"
                components={{
                  Header() {
                    return (
                      <div className="flex justify-center mb-6">
                        <Logo />
                      </div>
                    );
                  },
                  Footer() {
                    return (
                      <div className="text-center text-sm text-gray-500 mt-6">
                        &copy; {new Date().getFullYear()} サービス名
                      </div>
                    );
                  },
                  SignIn: {
                    Header() {
                      return (
                        <CardHeader className="space-y-1 text-center">
                          <CardTitle className="text-2xl font-bold">
                            ログイン
                          </CardTitle>
                        </CardHeader>
                      );
                    },
                  },
                  SignUp: {
                    Header() {
                      return (
                        <CardHeader className="space-y-1 text-center">
                          <CardTitle className="text-2xl font-bold">
                            新規登録
                          </CardTitle>
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
                {({ signOut, user }) => (
                  <Card className="border shadow-lg">
                    <CardContent className="p-6">{children}</CardContent>
                  </Card>
                )}
              </Authenticator>
            </ThemeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
