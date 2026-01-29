import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Star, Swords, Shield, Zap } from 'lucide-react';
import heroesData from '@/data/heroes.json';

export default async function HeroComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeroCompareContent locale={locale} />;
}

function HeroCompareContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // Get top heroes by tier (S+ and S)
  const sTierHeroes = heroesData.heroes.filter(h => h.tier === 'S+' || h.tier === 'S').slice(0, 6);

  const roleIcons: Record<string, React.ElementType> = {
    dps: Swords,
    tank: Shield,
    support: Zap,
  };

  const factionColors: Record<string, string> = {
    wingsOfDawn: 'text-blue-400',
    bloodRose: 'text-red-400',
    guardOfOrder: 'text-green-400',
  };

  const factionNames: Record<string, { ko: string; vi: string }> = {
    wingsOfDawn: { ko: '새벽의 날개', vi: 'Cánh Bình Minh' },
    bloodRose: { ko: '블러디 로즈', vi: 'Blood Rose' },
    guardOfOrder: { ko: '질서의 수호자', vi: 'Người Bảo Vệ Trật Tự' },
  };

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              5 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-highlight" />
            {isKorean ? '영웅 비교' : 'So sánh Anh hùng'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? 'S티어 영웅들의 특성을 비교합니다.'
              : 'So sánh đặc điểm của các anh hùng S-tier.'}
          </p>
        </div>

        {/* S-Tier Heroes Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
            {isKorean ? 'S티어 영웅 비교' : 'So sánh anh hùng S-Tier'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-3">{isKorean ? '영웅' : 'Anh hùng'}</th>
                  <th className="text-left p-3">{isKorean ? '진영' : 'Phe'}</th>
                  <th className="text-left p-3">{isKorean ? '역할' : 'Vai trò'}</th>
                  <th className="text-left p-3">{isKorean ? '병종' : 'Loại quân'}</th>
                  <th className="text-left p-3">{isKorean ? '특징' : 'Đặc điểm'}</th>
                </tr>
              </thead>
              <tbody>
                {sTierHeroes.map((hero) => {
                  const RoleIcon = roleIcons[hero.role] || Users;
                  return (
                    <tr key={hero.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{isKorean ? hero.name.ko : hero.name.vi}</span>
                          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">S</Badge>
                        </div>
                      </td>
                      <td className={`p-3 ${factionColors[hero.faction] || ''}`}>
                        {isKorean ? factionNames[hero.faction]?.ko : factionNames[hero.faction]?.vi}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <RoleIcon className="h-4 w-4" />
                          <span className="uppercase">{hero.role}</span>
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground capitalize">
                        {hero.class}
                      </td>
                      <td className="p-3 text-muted-foreground max-w-[200px]">
                        {isKorean ? hero.notes.ko : hero.notes.vi}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Role Comparison */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '역할별 특성' : 'Đặc điểm theo vai trò'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-red-500/5 border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Swords className="h-5 w-5" />
                  DPS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {isKorean ? '높은 공격력/데미지' : 'ATK/Damage cao'}</li>
                  <li>• {isKorean ? '적 처치 특화' : 'Chuyên tiêu diệt địch'}</li>
                  <li>• {isKorean ? '총/헬멧 우선 업그레이드' : 'Ưu tiên Súng/Mũ'}</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Shield className="h-5 w-5" />
                  Tank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {isKorean ? '높은 HP/방어력' : 'HP/DEF cao'}</li>
                  <li>• {isKorean ? '피해 흡수 특화' : 'Chuyên hấp thụ damage'}</li>
                  <li>• {isKorean ? '갑옷/부츠 우선 업그레이드' : 'Ưu tiên Giáp/Giày'}</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Zap className="h-5 w-5" />
                  Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {isKorean ? '팀 버프/힐' : 'Buff/Heal team'}</li>
                  <li>• {isKorean ? '유틸리티 특화' : 'Chuyên utility'}</li>
                  <li>• {isKorean ? '균형 업그레이드' : 'Nâng cấp cân bằng'}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recommendation */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <p className="font-semibold text-highlight mb-2">
              {isKorean ? '권장 조합' : 'Kết hợp khuyến nghị'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '메인 진형: 같은 진영 5명 (히든 버프 발동). 추천: 새벽의 날개 5명 (서버 70%가 블러디 로즈 선택으로 카운터 유리) 또는 새벽의 날개 3 + 블러디 로즈 2 조합.'
                : 'Đội hình chính: 5 người cùng phe (kích hoạt buff ẩn). Khuyến nghị: 5 Cánh Bình Minh (70% server chọn Blood Rose nên counter có lợi) hoặc 3 Cánh Bình Minh + 2 Blood Rose.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
