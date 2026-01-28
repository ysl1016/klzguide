import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Swords, Shield, Target, Eye, Lightbulb, AlertTriangle } from 'lucide-react';

export default async function PvPStrategyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PvPStrategyContent locale={locale} />;
}

function PvPStrategyContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const attackStrategies = [
    {
      name: isKorean ? '정찰 먼저' : 'Trinh sát trước',
      description: isKorean
        ? '공격 전 반드시 정찰. 상대 진영/병력/영웅 확인 후 카운터 구성'
        : 'Bắt buộc trinh sát trước khi tấn công. Kiểm tra phe/quân/anh hùng đối thủ rồi cấu thành counter',
    },
    {
      name: isKorean ? '가짜 랠리' : 'Rally giả',
      description: isKorean
        ? '진짜 공격 전 가짜 랠리로 상대 방어 유도 후 취소, 자원 낭비 유도'
        : 'Rally giả trước tấn công thật để dụ phòng thủ rồi hủy, khiến đối thủ lãng phí tài nguyên',
    },
    {
      name: isKorean ? '다중 랠리' : 'Rally đa điểm',
      description: isKorean
        ? '여러 타겟에 동시 랠리로 상대 방어 분산'
        : 'Rally đồng thời nhiều mục tiêu để phân tán phòng thủ đối thủ',
    },
    {
      name: isKorean ? '타이밍 공격' : 'Tấn công đúng thời điểm',
      description: isKorean
        ? '상대 쉴드 끝나는 시간, 비활성 시간대 노려 공격'
        : 'Tấn công khi shield đối thủ hết, vào giờ không hoạt động',
    },
  ];

  const defenseStrategies = [
    {
      name: isKorean ? '쉴드 관리' : 'Quản lý Shield',
      description: isKorean
        ? '오프라인 시 반드시 쉴드. 무과금도 8시간 쉴드는 자주 사용 가능'
        : 'Bắt buộc shield khi offline. F2P cũng có thể dùng shield 8 giờ thường xuyên',
    },
    {
      name: isKorean ? '병력 대피' : 'Sơ tán quân',
      description: isKorean
        ? '대규모 공격 예상 시 병력을 연맹 요새나 자원 타일로 대피'
        : 'Khi dự đoán tấn công lớn, sơ tán quân sang pháo đài liên minh hoặc ô tài nguyên',
    },
    {
      name: isKorean ? '방어 진형 전환' : 'Chuyển đội hình phòng thủ',
      description: isKorean
        ? '공격 감지 시 방어 특화 진형으로 빠르게 전환'
        : 'Khi phát hiện tấn công, nhanh chóng chuyển sang đội hình phòng thủ chuyên biệt',
    },
    {
      name: isKorean ? '연맹 지원 요청' : 'Yêu cầu hỗ trợ liên minh',
      description: isKorean
        ? '대규모 랠리 시 연맹원 지원병 요청'
        : 'Yêu cầu quân hỗ trợ từ thành viên liên minh khi bị rally lớn',
    },
  ];

  const battleTips = [
    {
      icon: Eye,
      title: isKorean ? '전장 인식' : 'Nhận thức chiến trường',
      tip: isKorean
        ? '적 움직임 항상 모니터링. 랠리 타이머, 행군 방향 주시'
        : 'Luôn theo dõi di chuyển của địch. Chú ý timer rally, hướng hành quân',
    },
    {
      icon: Target,
      title: isKorean ? '우선순위 타겟' : 'Mục tiêu ưu tiên',
      tip: isKorean
        ? '전력이 약한 적부터 제거하여 수적 우위 확보'
        : 'Loại bỏ địch yếu trước để có lợi thế số lượng',
    },
    {
      icon: Shield,
      title: isKorean ? '자원 보호' : 'Bảo vệ tài nguyên',
      tip: isKorean
        ? '전투 전 자원 모두 사용하거나 창고 용량 내로 유지'
        : 'Trước chiến đấu, dùng hết tài nguyên hoặc giữ trong dung lượng kho',
    },
  ];

  const commonMistakes = [
    isKorean ? '정찰 없이 공격 → 카운터 당함' : 'Tấn công không trinh sát → bị counter',
    isKorean ? '오프라인 시 쉴드 미사용 → 병력 손실' : 'Không shield khi offline → mất quân',
    isKorean ? '단독 행동 → 연맹 지원 없이 고립' : 'Hành động đơn độc → bị cô lập không hỗ trợ',
    isKorean ? '저티어 다수 병력 사용 → 쉽게 격파당함' : 'Dùng nhiều quân tier thấp → dễ bị đánh bại',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-advanced">
              {t('difficulty.advanced')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Swords className="h-8 w-8 text-highlight" />
            {isKorean ? 'PvP 전략 가이드' : 'Hướng dẫn chiến thuật PvP'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '공격/방어 전략과 전투 팁을 알아봅니다.'
              : 'Tìm hiểu chiến thuật tấn công/phòng thủ và mẹo chiến đấu.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '공격 전 반드시 정찰 → 카운터 구성' : 'Bắt buộc trinh sát trước tấn công → cấu thành counter'}</li>
              <li>• {isKorean ? '오프라인 시 반드시 쉴드 사용' : 'Bắt buộc dùng shield khi offline'}</li>
              <li>• {isKorean ? '연맹과 협력 - 단독 행동 금지' : 'Hợp tác với liên minh - cấm hành động đơn độc'}</li>
              <li>• {isKorean ? '전투 전 자원 보호 (사용 또는 창고 내)' : 'Bảo vệ tài nguyên trước chiến đấu'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Attack Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Swords className="h-6 w-6 text-red-400" />
            {isKorean ? '공격 전략' : 'Chiến thuật tấn công'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {attackStrategies.map((strategy, idx) => (
              <Card key={idx} className="bg-red-500/5 border-red-500/20">
                <CardContent className="p-4">
                  <p className="font-semibold text-red-400 mb-1">{strategy.name}</p>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Defense Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            {isKorean ? '방어 전략' : 'Chiến thuật phòng thủ'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {defenseStrategies.map((strategy, idx) => (
              <Card key={idx} className="bg-blue-500/5 border-blue-500/20">
                <CardContent className="p-4">
                  <p className="font-semibold text-blue-400 mb-1">{strategy.name}</p>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Battle Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '전투 팁' : 'Mẹo chiến đấu'}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {battleTips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <Icon className="h-6 w-6 text-highlight mb-2" />
                    <p className="font-semibold mb-1">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            {isKorean ? '흔한 실수' : 'Sai lầm thường gặp'}
          </h2>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4 space-y-2">
              {commonMistakes.map((mistake, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-destructive">✗</span>
                  <span className="text-sm text-muted-foreground">{mistake}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
