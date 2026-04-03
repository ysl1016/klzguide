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
  Users,
  AlertTriangle,
  Timer,
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

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3 text-warning" />
              {l('유효기간', 'Giới hạn thời gian', 'Time Limited')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3 text-orange-400" />
              {l('인원제한 (선착순)', 'Giới hạn số lượng', 'Quantity Limited')}
            </span>
            <span className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3 text-muted-foreground" />
              {l('제한 미확인', 'Chưa xác nhận', 'Limit Unknown')}
            </span>
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
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          {item.expiry && (
                            <span className="flex items-center gap-1 text-xs text-warning">
                              <Timer className="h-3 w-3" />
                              {l('만료: ', 'Hết hạn: ', 'Expires: ')}{item.expiry}
                            </span>
                          )}
                          {(item.limitType === 'quantity' || item.limitType === 'both') && (
                            <span className="flex items-center gap-1 text-xs text-orange-400">
                              <Users className="h-3 w-3" />
                              {l('인원제한', 'Giới hạn số lượng', 'Limited Redemptions')}
                            </span>
                          )}
                          {item.limitType === 'time' && !item.expiry && (
                            <span className="flex items-center gap-1 text-xs text-yellow-400">
                              <Clock className="h-3 w-3" />
                              {l('기간제한', 'Giới hạn thời gian', 'Time Limited')}
                            </span>
                          )}
                          {item.limitType === 'unknown' && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <AlertCircle className="h-3 w-3" />
                              {l('제한 미확인', 'Chưa xác nhận giới hạn', 'Limit Unknown')}
                            </span>
                          )}
                        </div>
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
                href: 'https://www.facebook.com/LastZSurvivalShooter/',
              },
              {
                title: l('공식 X (Twitter)', 'X (Twitter) chính thức', 'Official X (Twitter)'),
                desc: l(
                  '공식 이벤트 및 업데이트 공지',
                  'Thông báo sự kiện và cập nhật chính thức',
                  'Official event and update announcements'
                ),
                icon: ExternalLink,
                href: 'https://x.com/LastZ_EN',
              },
              {
                title: l('커뮤니티 디스코드', 'Discord cộng đồng', 'Community Discord'),
                desc: l(
                  '커뮤니티 이벤트 코드 및 공략 공유',
                  'Mã sự kiện cộng đồng và chia sẻ hướng dẫn',
                  'Community event codes and strategy sharing'
                ),
                icon: ExternalLink,
                href: 'https://discord.gg/hjdmKz5sap',
              },
              {
                title: 'Reddit (r/LastZShooterRun)',
                desc: l(
                  '커뮤니티 공략 및 코드 공유',
                  'Hướng dẫn cộng đồng và chia sẻ mã',
                  'Community guides and code sharing'
                ),
                icon: ExternalLink,
                href: 'https://www.reddit.com/r/LastZShooterRun/',
              },
              {
                title: l('공식 리딤 사이트', 'Trang đổi mã chính thức', 'Official Redeem Site'),
                desc: l(
                  'UID 입력 후 코드 사용',
                  'Nhập UID rồi sử dụng mã',
                  'Enter your UID and redeem codes'
                ),
                icon: Gift,
                href: 'https://last-z.com/giftCenter/',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:border-highlight/50 transition-colors cursor-pointer">
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
                </a>
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
                  '코드에는 유효기간(날짜 만료) 또는 인원제한(선착순 소진)이 있을 수 있습니다',
                  'Mã có thể có giới hạn thời gian (hết hạn theo ngày) hoặc giới hạn số lượng (hết khi đủ người dùng)',
                  'Codes may have a time limit (date expiry) or a quantity cap (first-come, first-served)'
                )}
              </li>
              <li>
                •{' '}
                {l(
                  '인원제한 코드는 예고 없이 소진될 수 있으니, 발견 즉시 사용을 권장합니다',
                  'Mã giới hạn số lượng có thể hết bất cứ lúc nào, hãy sử dụng ngay khi thấy',
                  'Quantity-limited codes can run out at any time — redeem as soon as you see them'
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
