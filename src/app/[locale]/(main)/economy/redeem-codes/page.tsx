'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Copy,
  Check,
  Gift,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { getAllCodes, getLastUpdated } from '@/lib/redeem-codes';

export default function RedeemCodesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  const redeemCodes = getAllCodes();
  const lastUpdated = getLastUpdated();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const activeCodes = redeemCodes.filter((c) => c.isActive);

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-beginner">
              {t('difficulty.beginner')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              2 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Gift className="h-8 w-8 text-highlight" />
            {l('리딤 코드', 'Mã đổi thưởng', 'Redeem Codes')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '유효한 리딤 코드를 복사해서 게임 내에서 사용하세요.',
              'Sao chép mã đổi thưởng hợp lệ và sử dụng trong game.',
              'Copy valid redeem codes and use them in-game.'
            )}
          </p>
        </div>

        {/* How to use */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {l('사용 방법', 'Cách sử dụng', 'How to Use')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>
                1.{' '}
                {l(
                  '공식 리딤 사이트 (last-z.com/giftCenter) 접속',
                  'Truy cập trang đổi thưởng (last-z.com/giftCenter)',
                  'Visit the official redeem site (last-z.com/giftCenter)'
                )}
              </li>
              <li>
                2.{' '}
                {l(
                  '게임 내 UID (유저 ID)를 입력',
                  'Nhập UID (User ID) trong game',
                  'Enter your in-game UID (User ID)'
                )}
              </li>
              <li>
                3.{' '}
                {l(
                  '아래 코드를 복사하여 입력창에 붙여넣기',
                  'Sao chép mã bên dưới và dán vào ô nhập',
                  'Copy the code below and paste it into the input field'
                )}
              </li>
              <li>
                4.{' '}
                {l(
                  '확인 후 게임 내 우편함에서 보상 수령',
                  'Xác nhận rồi nhận thưởng trong hộp thư game',
                  'Confirm and collect rewards from your in-game mailbox'
                )}
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Active Codes */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {l('유효한 코드', 'Mã hợp lệ', 'Active Codes')} ({activeCodes.length})
            </h2>
            <p className="text-xs text-muted-foreground">
              {l('최종 업데이트: ', 'Cập nhật: ', 'Last updated: ')}{lastUpdated}
            </p>
          </div>

          {activeCodes.length > 0 ? (
            <div className="grid gap-3">
              {activeCodes.map((item) => (
                <Card
                  key={item.code}
                  className={`transition-colors ${
                    copiedCode === item.code
                      ? 'border-tip bg-tip/5'
                      : 'hover:border-highlight/50'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-lg font-mono font-bold text-highlight">
                            {item.code}
                          </code>
                          {item.isNew && (
                            <Badge className="bg-tip text-tip-foreground text-xs">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.rewards[locale as 'ko' | 'vi' | 'en'] ?? item.rewards['en']}
                        </p>
                        {item.expiry && (
                          <p className="text-xs text-warning mt-1">
                            {l('만료: ', 'Hết hạn: ', 'Expires: ')}
                            {item.expiry}
                          </p>
                        )}
                      </div>
                      <Button
                        variant={copiedCode === item.code ? 'default' : 'outline'}
                        size="sm"
                        className={`shrink-0 ${
                          copiedCode === item.code
                            ? 'bg-tip hover:bg-tip text-tip-foreground'
                            : ''
                        }`}
                        onClick={() => copyToClipboard(item.code)}
                      >
                        {copiedCode === item.code ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            {l('복사됨', 'Đã sao chép', 'Copied')}
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            {l('복사', 'Sao chép', 'Copy')}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Gift className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="font-medium text-muted-foreground">
                  {l(
                    '현재 유효한 리딤 코드가 없습니다',
                    'Hiện không có mã đổi thưởng hợp lệ',
                    'No active redeem codes available'
                  )}
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  {l(
                    '새로운 코드가 나오면 업데이트됩니다',
                    'Sẽ cập nhật khi có mã mới',
                    'This page will be updated when new codes are released'
                  )}
                </p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Copy All - Only show when there are active codes */}
        {activeCodes.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {l('모든 코드 한번에 복사', 'Sao chép tất cả mã', 'Copy All Codes')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {l(
                      '모든 유효한 코드를 복사합니다',
                      'Sao chép tất cả mã hợp lệ',
                      'Copy all active codes at once'
                    )}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    const allCodes = activeCodes.map((c) => c.code).join('\n');
                    navigator.clipboard.writeText(allCodes);
                    setCopiedCode('all');
                    setTimeout(() => setCopiedCode(null), 2000);
                  }}
                >
                  {copiedCode === 'all' ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      {l('복사됨', 'Đã sao chép', 'Copied')}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      {l('전체 복사', 'Sao chép tất cả', 'Copy All')}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Where to find codes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('코드 찾는 곳', 'Nơi tìm mã', 'Where to Find Codes')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: l('공식 페이스북', 'Facebook chính thức', 'Official Facebook'),
                desc: l(
                  '새 코드가 가장 먼저 공개됩니다',
                  'Mã mới được công bố đầu tiên',
                  'New codes are published here first'
                ),
                icon: ExternalLink,
              },
              {
                title: l('공식 디스코드', 'Discord chính thức', 'Official Discord'),
                desc: l(
                  '커뮤니티 이벤트 코드',
                  'Mã sự kiện cộng đồng',
                  'Community event codes'
                ),
                icon: ExternalLink,
              },
              {
                title: l('유튜브/트위치', 'YouTube/Twitch', 'YouTube/Twitch'),
                desc: l(
                  '스트리머 전용 코드',
                  'Mã dành riêng cho streamer',
                  'Streamer-exclusive codes'
                ),
                icon: ExternalLink,
              },
              {
                title: l('게임 내 이벤트', 'Sự kiện trong game', 'In-Game Events'),
                desc: l(
                  '특별 이벤트 기간 코드',
                  'Mã trong thời gian sự kiện đặc biệt',
                  'Codes during special event periods'
                ),
                icon: Gift,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <Icon className="h-5 w-5 text-highlight shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Note */}
        <div className="info-warning flex gap-3">
          <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning">
              {l('주의사항', 'Lưu ý', 'Important Notes')}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 mt-1">
              <li>
                •{' '}
                {l(
                  '각 코드는 계정당 1회만 사용 가능합니다',
                  'Mỗi mã chỉ sử dụng được 1 lần/tài khoản',
                  'Each code can only be used once per account'
                )}
              </li>
              <li>
                •{' '}
                {l(
                  '코드는 예고 없이 만료될 수 있습니다',
                  'Mã có thể hết hạn mà không báo trước',
                  'Codes may expire without notice'
                )}
              </li>
              <li>
                •{' '}
                {l(
                  '대소문자를 정확히 입력해주세요',
                  'Nhập chính xác chữ hoa/thường',
                  'Enter codes exactly as shown (case-sensitive)'
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
