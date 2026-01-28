import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Trophy, Building2, FlaskConical, Swords, Users, Wrench, Target, Lightbulb, AlertTriangle, Calendar } from 'lucide-react';

export default async function AllianceDuelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AllianceDuelContent locale={locale} />;
}

function AllianceDuelContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const duelThemes = [
    {
      name: isKorean ? '건물 업그레이드' : 'Shelter Upgrade',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      activity: isKorean ? '건물 개선, 건설 가속 사용' : 'Cải thiện công trình, dùng tăng tốc xây',
      tip: isKorean ? '오렌지 현상금 새로고침, 고가치 퀘스트 우선' : 'Refresh bounty cam, ưu tiên quest giá trị cao',
    },
    {
      name: isKorean ? '과학의 시대' : 'Age of Science',
      icon: FlaskConical,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      activity: isKorean ? '연구 완료, 뱃지 관련 연구' : 'Hoàn thành NC, NC liên quan badge',
      tip: isKorean ? '인터스테이트 트럭 새로고침으로 오렌지 퀘스트 찾기' : 'Refresh Interstate Truck tìm quest cam',
    },
    {
      name: isKorean ? '영웅 이니셔티브' : 'Hero Initiative',
      icon: Users,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      activity: isKorean ? '영웅 업그레이드, 조각, 모집 티켓' : 'Nâng anh hùng, mảnh, vé tuyển mộ',
      tip: isKorean ? '이 날을 위해 조각/티켓 저장 - 다른 날 사용 금지!' : 'Lưu mảnh/vé cho ngày này - KHÔNG dùng ngày khác!',
    },
    {
      name: isKorean ? '종합 성장' : 'Holistic Growth',
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      activity: isKorean ? '병력 훈련, 훈련 가속 사용' : 'Huấn luyện quân, dùng tăng tốc HL',
      tip: isKorean ? '일반 병사 훈련이 자원 대비 최적 포인트' : 'Huấn luyện lính thường = điểm tối ưu/tài nguyên',
    },
    {
      name: isKorean ? '차량 개조' : 'Modded Vehicle Boost',
      icon: Wrench,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      activity: isKorean ? '렌치, 설계도, 부품으로 차량 업그레이드' : 'Nâng xe bằng cờ lê, bản vẽ, linh kiện',
      tip: isKorean ? '강력한 부머 처치로 추가 포인트' : 'Tiêu diệt Boomer mạnh để có thêm điểm',
    },
    {
      name: isKorean ? '적 파괴자' : 'Enemy Buster',
      icon: Target,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      activity: isKorean ? '적 기지 공격, 약한 HQ 공격' : 'Tấn công căn cứ địch, HQ yếu',
      tip: isKorean ? '발로 메달 + 오렌지 장비 조각 - 최고 보상!' : 'Valor Medal + mảnh trang bị cam - thưởng tốt nhất!',
    },
  ];

  const rewards = [
    { item: isKorean ? '영웅 뱃지' : 'Hero Badge', desc: isKorean ? '영웅 성급 업그레이드용' : 'Để nâng sao anh hùng' },
    { item: isKorean ? '오렌지 스킬북' : 'Orange Skill Book', desc: isKorean ? '영웅 스킬 레벨업' : 'Lên level skill anh hùng' },
    { item: isKorean ? '강화 합금' : 'Enhancement Alloy', desc: isKorean ? '장비 강화용' : 'Để nâng cấp trang bị' },
    { item: isKorean ? '다이아몬드' : 'Diamond', desc: isKorean ? '범용 프리미엄 재화' : 'Tiền tệ premium đa năng' },
    { item: isKorean ? '가속 아이템' : 'Speedup', desc: isKorean ? '각종 가속 아이템' : 'Các item tăng tốc' },
  ];

  const tips = [
    isKorean
      ? '테마에 맞지 않는 날에 가속/조각/티켓 사용 시 포인트 대폭 손실'
      : 'Dùng tăng tốc/mảnh/vé không đúng ngày theme = mất điểm lớn',
    isKorean
      ? '오렌지 레벨 퀘스트(현상금, 트럭) 우선 - 포인트 가치 훨씬 높음'
      : 'Ưu tiên quest cam (bounty, truck) - giá trị điểm cao hơn nhiều',
    isKorean
      ? 'Full Preparedness와 겹칠 때 활동 = 보상 2배 (골든 아워)'
      : 'Hoạt động khi trùng Full Prep = thưởng gấp đôi (Golden Hour)',
    isKorean
      ? '연맹 채팅으로 오늘 테마 공유, 자원 저장 알림 - 조직력 = 순위'
      : 'Chia sẻ theme hôm nay qua chat LM, nhắc lưu tài nguyên - tổ chức = xếp hạng',
    isKorean
      ? 'Enemy Buster 날에는 병력 손실 최소화 타겟 선정 필수'
      : 'Ngày Enemy Buster bắt buộc chọn target để giảm thiểu mất quân',
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
            <Trophy className="h-8 w-8 text-highlight" />
            {isKorean ? '연맹 대결 (Alliance Duel) 가이드' : 'Hướng dẫn Alliance Duel'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '7일간 진행되는 연맹 대결의 테마별 전략과 보상을 알아봅니다.'
              : 'Tìm hiểu chiến thuật theo theme và phần thưởng Alliance Duel 7 ngày.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '7일 연속 이벤트 - 매일 다른 테마 (6개 테마 순환)' : 'Sự kiện 7 ngày liên tục - mỗi ngày theme khác (6 theme xoay vòng)'}</li>
              <li>• {isKorean ? '테마에 맞는 활동만 포인트 획득 - 다른 활동은 최소/0 포인트' : 'Chỉ hoạt động đúng theme được điểm - hoạt động khác = ít/0 điểm'}</li>
              <li>• {isKorean ? '영웅 조각, 모집 티켓은 Hero Initiative 날에만 사용!' : 'Mảnh anh hùng, vé tuyển mộ chỉ dùng ngày Hero Initiative!'}</li>
              <li>• {isKorean ? 'Full Prep와 겹칠 때 = 보상 2배 (최고 효율)' : 'Khi trùng Full Prep = thưởng gấp đôi (hiệu quả nhất)'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Event Duration */}
        <Card className="border-highlight/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-highlight" />
              <div>
                <p className="font-semibold text-highlight">
                  {isKorean ? '7일 연속 이벤트' : 'Sự kiện 7 ngày liên tục'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '각 날마다 다른 테마가 적용됩니다. 테마에 해당하는 활동으로만 포인트를 획득할 수 있습니다.'
                    : 'Mỗi ngày có theme khác nhau. Chỉ hoạt động đúng theme mới được điểm.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Themes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '6개 테마 (매일 순환)' : '6 Theme (Xoay vòng hàng ngày)'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {duelThemes.map((theme) => {
              const Icon = theme.icon;
              return (
                <Card key={theme.name} className={`${theme.bg} border-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center gap-2 text-base ${theme.color}`}>
                      <Icon className="h-5 w-5" />
                      {theme.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">{theme.activity}</p>
                    <p className="text-xs text-muted-foreground/70 italic">{theme.tip}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '흔한 실수 - 피해야 할 것' : 'Sai lầm phổ biến - cần tránh'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '잘못된 테마 날에 가속/조각/티켓 사용' : 'Dùng tăng tốc/mảnh/vé vào ngày theme sai'}</li>
                  <li>• {isKorean ? '오렌지 레벨 퀘스트 무시' : 'Bỏ qua quest cấp cam'}</li>
                  <li>• {isKorean ? 'Enemy Buster에서 계획 없이 공격' : 'Tấn công không có kế hoạch trong Enemy Buster'}</li>
                  <li>• {isKorean ? '연맹원과 협력 없이 단독 행동' : 'Hành động đơn độc không hợp tác với LM'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '보상 (최대 9개 상자)' : 'Phần thưởng (tối đa 9 hộp)'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {rewards.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{r.item}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                {isKorean
                  ? '점수 마일스톤 달성 시 상자 해금 + 글로벌 순위 보상'
                  : 'Mở hộp khi đạt điểm milestone + thưởng xếp hạng global'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '전략 팁' : 'Mẹo chiến thuật'}</h2>
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
