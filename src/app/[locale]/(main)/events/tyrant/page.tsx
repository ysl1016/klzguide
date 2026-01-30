import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Skull, Lightbulb, AlertTriangle, Users, Home, Settings, Trophy, Zap } from 'lucide-react';

export default async function TyrantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TyrantContent locale={locale} />;
}

function TyrantContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const rallyInfo = [
    {
      size: isKorean ? '7-8명' : '7-8 người',
      efficiency: isKorean ? '최적' : 'Tối ưu',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      note: isKorean ? '권장 랠리 규모' : 'Quy mô rally khuyến nghị',
    },
    {
      size: isKorean ? '5-6명' : '5-6 người',
      efficiency: isKorean ? '양호' : 'Khá',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      note: isKorean ? '가능하지만 효율 감소' : 'Có thể nhưng hiệu quả giảm',
    },
    {
      size: isKorean ? '1-4명' : '1-4 người',
      efficiency: isKorean ? '비효율' : 'Không hiệu quả',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      note: isKorean ? '피해야 함' : 'Nên tránh',
    },
  ];

  const preparationSteps = [
    {
      step: 1,
      title: isKorean ? '부대 소환' : 'Triệu hồi quân',
      desc: isKorean
        ? '이벤트 시작 5분 전에 모든 부대를 본부(HQ)로 소환하세요'
        : 'Triệu hồi tất cả quân về HQ 5 phút trước sự kiện',
      icon: Home,
    },
    {
      step: 2,
      title: isKorean ? '오프라인 참여 설정' : 'Cài đặt tham gia offline',
      desc: isKorean
        ? '이벤트 센터 → 좀비폭군 → Engage Offline 활성화'
        : 'Event Center → Tyrant → Bật Engage Offline',
      icon: Settings,
    },
    {
      step: 3,
      title: isKorean ? '랠리 참여' : 'Tham gia rally',
      desc: isKorean
        ? 'R4/R5가 시작한 랠리에 참여, 최소 7명 모이면 출발'
        : 'Tham gia rally do R4/R5 tạo, ít nhất 7 người mới xuất phát',
      icon: Users,
    },
  ];

  const tips = [
    isKorean
      ? '본부(HQ) 31-35 플레이어에게 Steel은 핵심 자원 - 좀비폭군이 주요 획득처'
      : 'HQ 31-35 cần Steel - Tyrant là nguồn chính',
    isKorean
      ? 'Engage Offline 설정하면 부재 시에도 자동으로 랠리 참여'
      : 'Bật Engage Offline để tự động tham gia rally khi vắng mặt',
    isKorean
      ? '연맹 전체 데미지에 따라 보상 스케일링 - 협력이 핵심'
      : 'Phần thưởng theo damage cả LM - hợp tác là chìa khóa',
    isKorean
      ? '소규모 랠리는 비효율 - 최소 7명 이상 모아서 출발'
      : 'Rally nhỏ không hiệu quả - ít nhất 7 người mới xuất phát',
    isKorean
      ? '이벤트 시간 전에 다른 활동 완료하고 부대 대기 상태 유지'
      : 'Hoàn thành hoạt động khác trước sự kiện và giữ quân chờ sẵn',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-intermediate">
              {t('difficulty.intermediate')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Skull className="h-8 w-8 text-purple-400" />
            {isKorean ? '좀비폭군 (Tyrant) 가이드' : 'Hướng dẫn Tyrant Rally'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '연맹 랠리로 진행되는 좀비폭군 이벤트입니다. 본부(HQ) 31-35 성장에 필요한 Steel의 주요 획득처입니다.'
              : 'Sự kiện rally liên minh Tyrant. Nguồn chính để lấy Steel cho HQ 31-35.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '연맹 랠리 이벤트 - 본부(HQ) 31-35용 Steel 주요 획득처' : 'Sự kiện rally LM - nguồn Steel chính cho HQ 31-35'}</li>
              <li>• {isKorean ? '최적 랠리 규모: 7-8명 (소규모는 비효율)' : 'Quy mô rally tối ưu: 7-8 người (nhỏ không hiệu quả)'}</li>
              <li>• {isKorean ? '사전 준비: 시작 5분 전 모든 부대 본부(HQ)로 소환' : 'Chuẩn bị: triệu hồi tất cả quân về HQ 5 phút trước'}</li>
              <li>• {isKorean ? 'Engage Offline 설정으로 부재 시 자동 참여' : 'Bật Engage Offline để tự động tham gia khi vắng'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Rally Size Efficiency */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-highlight" />
            {isKorean ? '랠리 규모별 효율' : 'Hiệu quả theo quy mô rally'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {rallyInfo.map((info, idx) => (
              <Card key={idx} className={`${info.bg} border-none`}>
                <CardContent className="p-4 text-center">
                  <p className={`text-2xl font-bold ${info.color}`}>{info.size}</p>
                  <p className={`font-semibold ${info.color} mt-1`}>{info.efficiency}</p>
                  <p className="text-xs text-muted-foreground mt-2">{info.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Preparation Steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-orange-400" />
            {isKorean ? '사전 준비 단계' : 'Các bước chuẩn bị'}
          </h2>
          <div className="space-y-4">
            {preparationSteps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.step}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-highlight" />
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Engage Offline Feature */}
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Zap className="h-6 w-6 text-purple-400 shrink-0" />
              <div>
                <p className="font-semibold text-purple-400 mb-1">
                  Engage Offline {isKorean ? '기능' : 'Feature'}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {isKorean
                    ? '이벤트 센터 → 좀비폭군에서 Engage Offline을 활성화하면, 게임에 접속하지 않은 상태에서도 자동으로 랠리에 참여합니다.'
                    : 'Trong Event Center → Tyrant, bật Engage Offline sẽ tự động tham gia rally dù không online.'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isKorean
                    ? '※ 단, 부대가 본부(HQ)에 있어야만 자동 참여됩니다. 다른 활동 중인 부대는 참여하지 않습니다.'
                    : '※ Quân phải ở HQ mới tự động tham gia. Quân đang hoạt động khác sẽ không tham gia.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            {isKorean ? '보상' : 'Phần thưởng'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  {isKorean
                    ? '보상은 연맹 전체 데미지에 따라 스케일링됩니다. 개인 순위보다 연맹 전체 협력이 중요합니다.'
                    : 'Phần thưởng theo damage tổng của LM. Hợp tác LM quan trọng hơn xếp hạng cá nhân.'}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <p className="font-semibold text-blue-400">Steel</p>
                    <p className="text-xs">{isKorean ? '본부(HQ) 31-35 업그레이드 핵심 자원' : 'Tài nguyên chính cho HQ 31-35'}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <p className="font-semibold text-purple-400">{isKorean ? '추가 보상' : 'Thưởng thêm'}</p>
                    <p className="text-xs">{isKorean ? '연맹 데미지 마일스톤 달성 시' : 'Khi đạt milestone damage LM'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '주의사항' : 'Lưu ý'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '소규모 랠리(1-4명)는 비효율 - 최소 7명 모아서 출발' : 'Rally nhỏ (1-4 người) không hiệu quả - ít nhất 7 người'}</li>
                  <li>• {isKorean ? '부대가 다른 활동 중이면 랠리 참여 불가' : 'Quân đang hoạt động khác không thể tham gia rally'}</li>
                  <li>• {isKorean ? 'R4/R5만 랠리 시작 가능' : 'Chỉ R4/R5 mới có thể tạo rally'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Mẹo'}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
