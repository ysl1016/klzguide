import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Lightbulb, Zap, Shield, Swords, Target } from 'lucide-react';

export default async function HeroSynergyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeroSynergyContent locale={locale} />;
}

function HeroSynergyContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const factionBonuses = [
    {
      count: 3,
      bonus: '+107% ATK',
      description: isKorean ? '+5% 진영 보너스' : '+5% bonus phe',
    },
    {
      count: 4,
      bonus: '+110% ATK',
      description: isKorean ? '+7% 진영 보너스' : '+7% bonus phe',
    },
    {
      count: 5,
      bonus: '+115% ATK',
      description: isKorean ? '+10% 진영 보너스 (최대)' : '+10% bonus phe (tối đa)',
    },
  ];

  const recommendedFormations = [
    {
      name: isKorean ? '새벽의 날개 5 (F2P 권장)' : 'Cánh Bình Minh 5 (Khuyến nghị F2P)',
      composition: isKorean ? '새벽의 날개 5명' : '5 Cánh Bình Minh',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      reason: isKorean
        ? 'F2P 대부분이 블러디 로즈 → 새벽의 날개로 +10% 카운터 보너스. 슈터 스킬 시너지 극대화'
        : 'Đa số F2P dùng Blood Rose → Cánh Bình Minh có +10% counter bonus. Tối đa synergy skill Shooter',
      troops: isKorean ? '슈터 집중' : 'Tập trung Shooter',
    },
    {
      name: isKorean ? '새벽의 날개 3 + 블러디 로즈 2' : 'Cánh Bình Minh 3 + Blood Rose 2',
      composition: isKorean ? '새벽의 날개 3명 + 블러디 로즈 2명' : '3 Cánh Bình Minh + 2 Blood Rose',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      reason: isKorean
        ? '유연한 조합. 새벽의 날개 +107% ATK 보너스 유지하면서 블러디 로즈 영웅 활용'
        : 'Kết hợp linh hoạt. Giữ +107% ATK Cánh Bình Minh, tận dụng anh hùng Blood Rose',
      troops: isKorean ? '슈터 + 돌격 혼합' : 'Shooter + Assaulter hỗn hợp',
    },
    {
      name: isKorean ? '블러디 로즈 5' : 'Blood Rose 5',
      composition: isKorean ? '블러디 로즈 5명' : '5 Blood Rose',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      reason: isKorean
        ? '버스트 데미지 특화. 질서의 수호자에 +10% 카운터'
        : 'Chuyên burst damage. +10% counter chống Người Bảo Vệ Trật Tự',
      troops: isKorean ? '돌격 집중' : 'Tập trung Assaulter',
    },
  ];

  const counterSystem = [
    { attacker: isKorean ? '새벽의 날개' : 'Cánh Bình Minh', defender: isKorean ? '블러디 로즈' : 'Blood Rose', color: 'text-blue-400' },
    { attacker: isKorean ? '블러디 로즈' : 'Blood Rose', defender: isKorean ? '질서의 수호자' : 'Người Bảo Vệ Trật Tự', color: 'text-red-400' },
    { attacker: isKorean ? '질서의 수호자' : 'Người Bảo Vệ Trật Tự', defender: isKorean ? '새벽의 날개' : 'Cánh Bình Minh', color: 'text-green-400' },
  ];

  const synergyTips = [
    {
      icon: Target,
      title: isKorean ? '스킬-병종 매칭' : 'Kết hợp Skill-Quân',
      tip: isKorean
        ? '영웅의 3, 4번째 스킬이 버프하는 병종으로 진형 구성'
        : 'Cấu thành đội hình với loại quân được buff bởi skill 3, 4',
    },
    {
      icon: Zap,
      title: isKorean ? '5인 동일 진영' : '5 người cùng phe',
      tip: isKorean
        ? '+115% ATK, +10% 진영 보너스로 낮은 티어 영웅도 가치 상승'
        : '+115% ATK, +10% bonus phe, anh hùng tier thấp cũng tăng giá trị',
    },
    {
      icon: Shield,
      title: isKorean ? 'F2P 메타 카운터' : 'Counter meta F2P',
      tip: isKorean
        ? 'F2P 다수가 블러디 로즈 사용 → 새벽의 날개로 카운터 (+10%)'
        : 'Đa số F2P dùng Blood Rose → counter bằng Cánh Bình Minh (+10%)',
    },
  ];

  const heroMatching = [
    {
      faction: isKorean ? '새벽의 날개' : 'Cánh Bình Minh',
      troop: isKorean ? '슈터' : 'Shooter',
      heroes: isKorean
        ? ['퀴니 (S+)', '릴리아나 (S+)', '알마 (S)', '닉스 (S)', '스칼렛 (S)']
        : ['Queenie (S+)', 'Liliana (S+)', 'Alma (S)', 'Nyx (S)', 'Scarlett (S)'],
      color: 'text-blue-400',
    },
    {
      faction: isKorean ? '블러디 로즈' : 'Blood Rose',
      troop: isKorean ? '돌격' : 'Assaulter',
      heroes: isKorean
        ? ['유찬 (S+)', '리시아 (S+)', '벨라 (S)', '셀레나 (S)']
        : ['Yu Chan (S+)', 'Licia (S+)', 'Bella (S)', 'Selena (S)'],
      color: 'text-red-400',
    },
    {
      faction: isKorean ? '질서의 수호자' : 'Người Bảo Vệ Trật Tự',
      troop: isKorean ? '라이더' : 'Rider',
      heroes: isKorean
        ? ['앰버 (S+)', '도데메키 (S+)', '할리에나 (S)', '사쿠라 (S)']
        : ['Amber (S+)', 'Dodemeki (S+)', 'Harleyena (S)', 'Sakura (S)'],
      color: 'text-green-400',
    },
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
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-highlight" />
            {isKorean ? '영웅 조합 & 시너지 가이드' : 'Hướng dẫn kết hợp & synergy Anh hùng'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '진영 시너지, 카운터 시스템, 최적 조합을 알아봅니다.'
              : 'Tìm hiểu synergy phe, hệ thống counter, kết hợp tối ưu.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '같은 진영 5명 → +115% ATK, +10% 진영 보너스' : '5 anh hùng cùng phe → +115% ATK, +10% bonus phe'}</li>
              <li>• {isKorean ? '카운터: 새벽의 날개 > 블러디 로즈 > 질서의 수호자 > 새벽의 날개 (10% 전투 보너스)' : 'Counter: Cánh Bình Minh > Blood Rose > Người Bảo Vệ Trật Tự > Cánh Bình Minh (10% bonus chiến đấu)'}</li>
              <li>• {isKorean ? 'F2P 대부분 블러디 로즈 → 새벽의 날개로 카운터' : 'Đa số F2P dùng Blood Rose → counter bằng Cánh Bình Minh'}</li>
              <li>• {isKorean ? '블러디 로즈→돌격, 새벽의 날개→슈터, 질서의 수호자→라이더 매칭' : 'Blood Rose→Assaulter, Cánh Bình Minh→Shooter, Người Bảo Vệ Trật Tự→Rider'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Faction Bonuses */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '진영 시너지 보너스' : 'Bonus synergy phe'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {factionBonuses.map((bonus) => (
              <Card key={bonus.count} className={bonus.count === 5 ? 'border-highlight/50 bg-highlight/5' : ''}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(bonus.count)].map((_, i) => (
                      <Users key={i} className={`h-5 w-5 ${bonus.count === 5 ? 'text-highlight' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <p className={`font-semibold ${bonus.count === 5 ? 'text-highlight' : ''}`}>{bonus.bonus}</p>
                  <p className="text-sm text-muted-foreground mt-1">{bonus.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Counter System */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '카운터 시스템' : 'Hệ thống Counter'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap justify-center gap-4">
                {counterSystem.map((counter, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className={`font-semibold ${counter.color}`}>{counter.attacker}</span>
                    <span className="text-muted-foreground">{'>'}</span>
                    <span className="text-muted-foreground">{counter.defender}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                {isKorean
                  ? '카운터 시 +10% 전투 보너스 획득'
                  : 'Counter cho +10% bonus chiến đấu'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Recommended Formations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '권장 진형 조합' : 'Kết hợp đội hình khuyến nghị'}
          </h2>
          <div className="space-y-4">
            {recommendedFormations.map((formation, idx) => (
              <Card key={idx} className={`${formation.border} ${formation.bg}`}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className={`font-semibold ${formation.color}`}>{formation.name}</h3>
                      <p className="text-sm text-muted-foreground">{formation.composition}</p>
                    </div>
                    <Badge variant="outline" className={formation.color}>
                      {formation.troops}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{formation.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hero-Troop Matching */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '진영별 영웅-병종 매칭' : 'Kết hợp Anh hùng-Quân theo phe'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {heroMatching.map((match, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg ${match.color}`}>{match.faction}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className={`mb-3 ${match.color}`}>
                    {match.troop}
                  </Badge>
                  <div className="space-y-1">
                    {match.heroes.map((hero, i) => (
                      <p key={i} className="text-sm text-muted-foreground">• {hero}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Synergy Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '시너지 팁' : 'Mẹo synergy'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {synergyTips.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <Icon className="h-6 w-6 text-tip mb-2" />
                    <p className="font-semibold text-tip mb-1">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">{tip.tip}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Important Note */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Lightbulb className="h-5 w-5 text-highlight shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-highlight mb-1">
                  {isKorean ? '핵심 포인트' : 'Điểm cốt lõi'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '낮은 티어 영웅이라도 진영 시너지에 기여합니다. 5인 동일 진영의 히든 버프가 랜덤한 강한 영웅 1명을 넣는 것보다 더 큰 파워를 제공합니다.'
                    : 'Anh hùng tier thấp vẫn đóng góp cho synergy phe. Buff ẩn 5 người cùng phe mạnh hơn 1 anh hùng mạnh random.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
