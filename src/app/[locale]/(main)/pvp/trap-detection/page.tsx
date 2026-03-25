import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Lightbulb, AlertTriangle, Search, Eye, Shield, Skull } from 'lucide-react';

export default async function TrapDetectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TrapDetectionContent locale={locale} />;
}

function TrapDetectionContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const warningSignals = [
    {
      signal: isKorean ? '킬 수 대비 낮은 전투력' : 'High kills but low power',
      safe: isKorean ? '킬 수 적음 + 전투력 높음' : 'Few kills + high power',
      trap: isKorean ? '킬 수 많음 + 전투력 낮음' : 'Many kills + low power',
      icon: Skull,
      color: 'text-red-400',
    },
    {
      signal: isKorean ? '진영 선택' : 'Faction choice',
      safe: isKorean ? '블러디 로즈 (보편적)' : 'Blood Rose (common)',
      trap: isKorean ? '새벽의 날개 (카운터 우위)' : 'Wings of Dawn (counter advantage)',
      icon: Shield,
      color: 'text-blue-400',
    },
    {
      signal: isKorean ? '노출된 자원' : 'Exposed resources',
      safe: isKorean ? '자원 거의 없음' : 'Little to no resources',
      trap: isKorean ? '자원이 의심스럽게 많음 (미끼)' : 'Suspiciously abundant resources (bait)',
      icon: Eye,
      color: 'text-yellow-400',
    },
    {
      signal: isKorean ? '위치' : 'Location',
      safe: isKorean ? '랜덤 위치' : 'Random placement',
      trap: isKorean ? '눈에 띄게 노출된 위치' : 'Conspicuously exposed position',
      icon: Search,
      color: 'text-orange-400',
    },
  ];

  const secondaryChecks = [
    isKorean ? '차량 개조 전투력이 전체 대비 비정상적으로 높은 경우' : 'Modified vehicle power disproportionately high vs total power',
    isKorean ? '영웅 전투력이 전체 대비 비정상적으로 강한 경우 — 전투 특화 투자' : 'Hero power unusually strong vs total — combat-focused investment',
    isKorean ? '기술 연구 수준이 낮은 경우 — 전투 연구에 집중 투자 의심' : 'Low tech level — may have concentrated on combat research',
    isKorean ? '강한 연맹 소속 — 연맹 지원으로 트랩 치명도 증가' : 'Strong alliance membership — alliance support amplifies trap lethality',
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
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Search className="h-8 w-8 text-highlight" />
            {isKorean ? '트랩 계정 감지 가이드' : 'Hướng dẫn Phát hiện Tài khoản Bẫy'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '공격 전 트랩 계정을 식별하는 방법. 스카우트 없이 공격하지 마세요.'
              : 'Cách nhận biết tài khoản bẫy trước khi tấn công. KHÔNG tấn công mà không scout.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '핵심 공식: 낮은 전투력 + 높은 킬 수 = 트랩 경고' : 'Công thức: CP thấp + kill cao = CẢNH BÁO BẪY'}</li>
              <li>• {isKorean ? '공격 전 반드시 스카우트 — 낮은 전투력 = 약한 적이 아님' : 'Luôn scout trước khi tấn công — CP thấp ≠ yếu'}</li>
              <li>• {isKorean ? '120M 새벽의 날개가 130M 블러디 로즈를 이길 수 있음' : '120M WoD thắng 130M BR — lợi thế phe vượt chênh lệch'}</li>
              <li>• {isKorean ? '자원이 많이 노출된 기지 = 미끼일 가능성 높음' : 'Căn cứ lộ nhiều tài nguyên = khả năng cao là mồi nhử'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Core Rule */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '절대 규칙: 스카우트 없이 공격하지 마세요' : 'Quy tắc tuyệt đối: KHÔNG tấn công khi chưa scout'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '낮은 전투력이 약한 적을 의미하지 않습니다. 트랩 계정은 의도적으로 전투력을 낮추고 전투 능력에 집중 투자합니다. 항상 스카우트로 실제 전투 준비 상태를 확인하세요.'
                    : 'CP thấp không có nghĩa là yếu. Tài khoản bẫy cố tình giữ CP thấp và tập trung đầu tư cho chiến đấu. Luôn scout để xác nhận năng lực chiến đấu thực tế.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning Signals Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Eye className="h-6 w-6 text-highlight" />
            {isKorean ? '주요 경고 신호' : 'Tín hiệu cảnh báo chính'}
          </h2>
          <div className="space-y-3">
            {warningSignals.map((signal, idx) => {
              const Icon = signal.icon;
              return (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`h-5 w-5 ${signal.color}`} />
                      <span className={`font-semibold ${signal.color}`}>{signal.signal}</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="p-3 rounded-lg bg-green-500/10">
                        <p className="text-green-400 font-bold text-xs mb-1">{isKorean ? '안전한 타겟' : 'Mục tiêu an toàn'}</p>
                        <p className="text-sm text-muted-foreground">{signal.safe}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-red-500/10">
                        <p className="text-red-400 font-bold text-xs mb-1">{isKorean ? '트랩 의심' : 'Nghi bẫy'}</p>
                        <p className="text-sm text-muted-foreground">{signal.trap}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Secondary Checks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '추가 확인 사항' : 'Kiểm tra bổ sung'}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              {secondaryChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{check}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Power Threshold */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-4">
            <p className="font-semibold text-blue-400 mb-2">
              {isKorean ? '진영 우위의 힘' : 'Sức mạnh lợi thế phe'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '120M 새벽의 날개 진형이 130M 블러디 로즈 진형을 이길 수 있습니다. 진영 상성 우위는 약 1,000만 전투력 차이를 극복합니다. 트랩 계정은 이 메커니즘을 악용합니다.'
                : 'Đội 120M Wings of Dawn thắng 130M Blood Rose. Lợi thế tương khắc phe vượt qua ~10M chênh lệch CP. Tài khoản bẫy lợi dụng cơ chế này.'}
            </p>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '방어 팁' : 'Mẹo phòng thủ'}</h2>
          <div className="grid gap-3">
            {[
              isKorean ? '공격 전 항상 스카우트 — 전투력만 보고 판단하지 마세요' : 'Luôn scout trước — không phán đoán chỉ dựa vào CP',
              isKorean ? '킬/전투력 비율을 확인하세요 — 킬 수가 전투력에 비해 비정상적이면 트랩' : 'Kiểm tra tỷ lệ kill/CP — kill bất thường so với CP = bẫy',
              isKorean ? '자원이 많이 보이는 기지는 의심하세요 — 미끼일 가능성 높음' : 'Nghi ngờ căn cứ có nhiều tài nguyên — khả năng cao là mồi',
              isKorean ? '약한 연맹의 플레이어가 홀로 노출되어 있으면 주의' : 'Cẩn thận khi người chơi liên minh yếu đứng một mình',
              isKorean ? 'Enemy Buster 때 다이아 2,000개 이상 방패 준비 필수' : 'Enemy Buster cần chuẩn bị khiên 2,000+ diamond',
            ].map((tip, idx) => (
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
