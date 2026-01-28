'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Clock,
  Copy,
  Check,
  Gift,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

// 리딤 코드 데이터 - lastzguides.com 기준 (현재 유효한 코드 없음)
// 새 코드가 발견되면 여기에 추가
const redeemCodes: {
  code: string;
  rewards: { ko: string; vi: string };
  expiry: string | null;
  isNew: boolean;
  isActive: boolean;
}[] = [
  // 현재 유효한 코드 없음
  // 예시 형식:
  // {
  //   code: 'EXAMPLECODE',
  //   rewards: {
  //     ko: '다이아몬드 500 + 골드 10,000',
  //     vi: 'Kim cương 500 + Vàng 10,000',
  //   },
  //   expiry: '2025-12-31',
  //   isNew: true,
  //   isActive: true,
  // },
];

export default function RedeemCodesPage() {
  const t = useTranslations();
  const locale = useLocale() as 'ko' | 'vi';
  const isKorean = locale === 'ko';

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
            {isKorean ? '리딤 코드' : 'Mã đổi thưởng'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '유효한 리딤 코드를 복사해서 게임 내에서 사용하세요.'
              : 'Sao chép mã đổi thưởng hợp lệ và sử dụng trong game.'}
          </p>
        </div>

        {/* How to use */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {isKorean ? '사용 방법' : 'Cách sử dụng'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>
                1.{' '}
                {isKorean
                  ? '게임 내 설정 > 리딤 코드 메뉴로 이동'
                  : 'Vào Cài đặt > Menu Mã đổi thưởng trong game'}
              </li>
              <li>
                2.{' '}
                {isKorean
                  ? '아래 코드를 복사하여 입력창에 붙여넣기'
                  : 'Sao chép mã bên dưới và dán vào ô nhập'}
              </li>
              <li>
                3.{' '}
                {isKorean
                  ? '확인 버튼을 눌러 보상 수령'
                  : 'Nhấn nút xác nhận để nhận thưởng'}
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Active Codes */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {isKorean ? '유효한 코드' : 'Mã hợp lệ'} ({activeCodes.length})
            </h2>
            <p className="text-xs text-muted-foreground">
              {isKorean ? '최종 업데이트: 2025.01.28' : 'Cập nhật: 28/01/2025'}
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
                          {item.rewards[locale]}
                        </p>
                        {item.expiry && (
                          <p className="text-xs text-warning mt-1">
                            {isKorean ? '만료: ' : 'Hết hạn: '}
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
                            {isKorean ? '복사됨' : 'Đã sao chép'}
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            {isKorean ? '복사' : 'Sao chép'}
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
                  {isKorean
                    ? '현재 유효한 리딤 코드가 없습니다'
                    : 'Hiện không có mã đổi thưởng hợp lệ'}
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  {isKorean
                    ? '새로운 코드가 나오면 업데이트됩니다'
                    : 'Sẽ cập nhật khi có mã mới'}
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
                    {isKorean ? '모든 코드 한번에 복사' : 'Sao chép tất cả mã'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isKorean
                      ? '모든 유효한 코드를 복사합니다'
                      : 'Sao chép tất cả mã hợp lệ'}
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
                      {isKorean ? '복사됨' : 'Đã sao chép'}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      {isKorean ? '전체 복사' : 'Sao chép tất cả'}
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
            {isKorean ? '코드 찾는 곳' : 'Nơi tìm mã'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: isKorean ? '공식 페이스북' : 'Facebook chính thức',
                desc: isKorean
                  ? '새 코드가 가장 먼저 공개됩니다'
                  : 'Mã mới được công bố đầu tiên',
                icon: ExternalLink,
              },
              {
                title: isKorean ? '공식 디스코드' : 'Discord chính thức',
                desc: isKorean
                  ? '커뮤니티 이벤트 코드'
                  : 'Mã sự kiện cộng đồng',
                icon: ExternalLink,
              },
              {
                title: isKorean ? '유튜브/트위치' : 'YouTube/Twitch',
                desc: isKorean
                  ? '스트리머 전용 코드'
                  : 'Mã dành riêng cho streamer',
                icon: ExternalLink,
              },
              {
                title: isKorean ? '게임 내 이벤트' : 'Sự kiện trong game',
                desc: isKorean
                  ? '특별 이벤트 기간 코드'
                  : 'Mã trong thời gian sự kiện đặc biệt',
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
              {isKorean ? '주의사항' : 'Lưu ý'}
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 mt-1">
              <li>
                •{' '}
                {isKorean
                  ? '각 코드는 계정당 1회만 사용 가능합니다'
                  : 'Mỗi mã chỉ sử dụng được 1 lần/tài khoản'}
              </li>
              <li>
                •{' '}
                {isKorean
                  ? '코드는 예고 없이 만료될 수 있습니다'
                  : 'Mã có thể hết hạn mà không báo trước'}
              </li>
              <li>
                •{' '}
                {isKorean
                  ? '대소문자를 정확히 입력해주세요'
                  : 'Nhập chính xác chữ hoa/thường'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
