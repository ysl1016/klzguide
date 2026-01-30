'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Calculator,
  Building2,
  FlaskConical,
  Users,
  Wrench,
  Swords,
  HelpCircle,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Info,
} from 'lucide-react';

export default function CPCalculatorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isKorean = locale === 'ko';

  const [structurePower, setStructurePower] = useState<number>(0);
  const [techPower, setTechPower] = useState<number>(0);
  const [troopPower, setTroopPower] = useState<number>(0);
  const [heroPower, setHeroPower] = useState<number>(0);
  const [vehiclePower, setVehiclePower] = useState<number>(0);

  const totalPower = structurePower + techPower + troopPower + heroPower + vehiclePower;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const powerCategories = [
    {
      key: 'structure',
      name: isKorean ? '건물' : 'Công trình',
      icon: Building2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      value: structurePower,
      setValue: setStructurePower,
      description: isKorean
        ? '본부(HQ), 연구소, 캠프 등 건물 레벨에서 발생'
        : 'Từ level các công trình như HQ, Lab, Camp',
      howToIncrease: isKorean
        ? '본부(HQ)와 연구소 업그레이드 우선'
        : 'Ưu tiên nâng HQ và Lab',
      idealRange: '15-20%',
    },
    {
      key: 'tech',
      name: isKorean ? '기술' : 'Công nghệ',
      icon: FlaskConical,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      value: techPower,
      setValue: setTechPower,
      description: isKorean
        ? '연구소에서 완료한 연구 수에서 발생'
        : 'Từ số nghiên cứu hoàn thành trong Lab',
      howToIncrease: isKorean
        ? '연맹 인정(AR) 연구 먼저 완료'
        : 'Hoàn thành NC Alliance Recognition trước',
      idealRange: '10-15%',
    },
    {
      key: 'troop',
      name: isKorean ? '병력' : 'Quân đội',
      icon: Swords,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      value: troopPower,
      setValue: setTroopPower,
      description: isKorean
        ? '병사 수와 티어(레벨)에서 발생'
        : 'Từ số lượng và tier (level) lính',
      howToIncrease: isKorean
        ? '훈련 대기열 24시간 유지, 고티어 병사 우선'
        : 'Giữ hàng đợi huấn luyện 24/7, ưu tiên lính tier cao',
      idealRange: '40-50%',
    },
    {
      key: 'hero',
      name: isKorean ? '영웅' : 'Anh hùng',
      icon: Users,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      value: heroPower,
      setValue: setHeroPower,
      description: isKorean
        ? '영웅 레벨, 성급, 스킬, 장비에서 발생'
        : 'Từ level, sao, kỹ năng, trang bị anh hùng',
      howToIncrease: isKorean
        ? '메인 5명 영웅에만 집중 투자'
        : 'Chỉ tập trung đầu tư 5 anh hùng chính',
      idealRange: '15-25%',
    },
    {
      key: 'vehicle',
      name: isKorean ? '차량' : 'Xe',
      icon: Wrench,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      value: vehiclePower,
      setValue: setVehiclePower,
      description: isKorean
        ? '차량 레벨, 개조, 부품에서 발생'
        : 'Từ level xe, cải tạo, linh kiện',
      howToIncrease: isKorean
        ? '부품 레벨 100+ 목표, Hercules 우선'
        : 'Mục tiêu linh kiện level 100+, ưu tiên Hercules',
      idealRange: '5-10%',
    },
  ];

  // HQ별 예상 전투력 기준
  const hqBenchmarks = [
    { hq: 25, cp: '5M', cpNum: 5000000 },
    { hq: 28, cp: '15M', cpNum: 15000000 },
    { hq: 30, cp: '30M', cpNum: 30000000 },
    { hq: 32, cp: '50M', cpNum: 50000000 },
    { hq: 35, cp: '80M', cpNum: 80000000 },
    { hq: 38, cp: '120M', cpNum: 120000000 },
  ];

  const getPercentage = (value: number) => {
    if (totalPower === 0) return 0;
    return ((value / totalPower) * 100).toFixed(1);
  };

  const getPercentageNum = (value: number) => {
    if (totalPower === 0) return 0;
    return (value / totalPower) * 100;
  };

  // 밸런스 분석
  const getBalanceAnalysis = () => {
    if (totalPower === 0) return null;

    const troopPercent = getPercentageNum(troopPower);
    const structurePercent = getPercentageNum(structurePower);
    const heroPercent = getPercentageNum(heroPower);
    const techPercent = getPercentageNum(techPower);
    const vehiclePercent = getPercentageNum(vehiclePower);

    const issues: { type: 'warning' | 'info'; message: string }[] = [];
    const goods: string[] = [];

    // 병력 체크 (40-50% 이상적)
    if (troopPercent < 30) {
      issues.push({
        type: 'warning',
        message: isKorean
          ? '병력 비율이 낮습니다. 훈련을 24시간 유지하세요.'
          : 'Tỷ lệ quân đội thấp. Giữ huấn luyện 24/7.',
      });
    } else if (troopPercent >= 40 && troopPercent <= 55) {
      goods.push(isKorean ? '병력 비율이 적절합니다' : 'Tỷ lệ quân đội tốt');
    } else if (troopPercent > 60) {
      issues.push({
        type: 'info',
        message: isKorean
          ? '병력 비율이 높습니다. 다른 영역도 투자하세요.'
          : 'Tỷ lệ quân đội cao. Đầu tư thêm các lĩnh vực khác.',
      });
    }

    // 건물 체크 (15-20% 이상적)
    if (structurePercent < 10) {
      issues.push({
        type: 'warning',
        message: isKorean
          ? '건물 전투력이 낮습니다. 본부(HQ) 업그레이드를 진행하세요.'
          : 'CP công trình thấp. Tiến hành nâng cấp HQ.',
      });
    } else if (structurePercent >= 15 && structurePercent <= 25) {
      goods.push(isKorean ? '건물 비율이 적절합니다' : 'Tỷ lệ công trình tốt');
    }

    // 영웅 체크 (15-25% 이상적)
    if (heroPercent < 10) {
      issues.push({
        type: 'info',
        message: isKorean
          ? '영웅 전투력이 낮습니다. 메인 5명에 집중 투자하세요.'
          : 'CP anh hùng thấp. Tập trung đầu tư 5 anh hùng chính.',
      });
    } else if (heroPercent >= 15 && heroPercent <= 30) {
      goods.push(isKorean ? '영웅 비율이 적절합니다' : 'Tỷ lệ anh hùng tốt');
    }

    // 기술 체크
    if (techPercent < 5) {
      issues.push({
        type: 'info',
        message: isKorean
          ? '기술 전투력이 낮습니다. 연구를 계속 진행하세요.'
          : 'CP công nghệ thấp. Tiếp tục nghiên cứu.',
      });
    }

    // 차량 체크
    if (vehiclePercent < 3 && totalPower > 10000000) {
      issues.push({
        type: 'info',
        message: isKorean
          ? '차량 전투력이 낮습니다. 부품 레벨업을 고려하세요.'
          : 'CP xe thấp. Cân nhắc nâng cấp linh kiện.',
      });
    }

    return { issues, goods };
  };

  // 현재 HQ 레벨 추정
  const estimateHQLevel = () => {
    if (totalPower === 0) return null;
    for (let i = hqBenchmarks.length - 1; i >= 0; i--) {
      if (totalPower >= hqBenchmarks[i].cpNum) {
        return hqBenchmarks[i].hq;
      }
    }
    return hqBenchmarks[0].hq - 3;
  };

  const analysis = getBalanceAnalysis();
  const estimatedHQ = estimateHQLevel();

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calculator className="h-8 w-8 text-highlight" />
            {isKorean ? 'CP 계산기' : 'Máy tính CP'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '전투력 구성 요소를 입력하여 총 CP와 비율을 확인하고, 밸런스 분석을 받아보세요.'
              : 'Nhập các thành phần sức mạnh để kiểm tra tổng CP, tỷ lệ và nhận phân tích cân bằng.'}
          </p>
        </div>

        {/* How to Find CP - 초보자 가이드 */}
        <Card className="border-info/30 bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-info">
              <HelpCircle className="h-5 w-5" />
              {isKorean ? 'CP 확인 방법' : 'Cách xem CP'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              {isKorean
                ? '게임 내에서 다음 경로로 CP를 확인할 수 있습니다:'
                : 'Bạn có thể xem CP trong game theo đường dẫn sau:'}
            </p>
            <div className="bg-background/50 rounded-lg p-3 space-y-1">
              <p className="font-mono">
                {isKorean
                  ? '프로필 아이콘 (좌상단) → 전투력 상세 보기'
                  : 'Icon profile (góc trái trên) → Xem chi tiết sức mạnh'}
              </p>
            </div>
            <p className="text-xs">
              {isKorean
                ? '※ 각 카테고리별 전투력이 표시됩니다. 해당 숫자를 아래에 입력하세요.'
                : '※ CP từng loại sẽ được hiển thị. Nhập số đó vào bên dưới.'}
            </p>
          </CardContent>
        </Card>

        {/* Total Power Display */}
        <Card className="border-highlight/50 bg-highlight/5">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {isKorean ? '총 전투력' : 'Tổng CP'}
              </p>
              <p className="text-5xl font-bold text-highlight">{formatNumber(totalPower)}</p>
              {estimatedHQ && totalPower > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {isKorean
                    ? `예상 본부(HQ) 레벨: ${estimatedHQ}+`
                    : `Dự đoán level HQ: ${estimatedHQ}+`}
                </p>
              )}
            </div>

            {/* HQ Benchmarks */}
            {totalPower > 0 && (
              <div className="border-t border-border/50 pt-4 mt-4">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  {isKorean ? '본부(HQ) 레벨별 예상 전투력' : 'CP dự kiến theo level HQ'}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {hqBenchmarks.map((bench) => (
                    <div
                      key={bench.hq}
                      className={`px-3 py-1 rounded-full text-xs ${
                        totalPower >= bench.cpNum
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      HQ{bench.hq}: {bench.cp}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Power Inputs with Descriptions */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="h-5 w-5 text-highlight" />
            {isKorean ? '전투력 입력' : 'Nhập CP'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {powerCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.key} className={cat.bgColor}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center gap-2 text-lg ${cat.color}`}>
                      <Icon className="h-5 w-5" />
                      {cat.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Input
                        id={cat.key}
                        type="number"
                        value={cat.value || ''}
                        onChange={(e) => cat.setValue(Number(e.target.value) || 0)}
                        placeholder="0"
                        className="text-lg"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isKorean ? '비율' : 'Tỷ lệ'}
                      </span>
                      <span className={cat.color}>{getPercentage(cat.value)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cat.color.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(Number(getPercentage(cat.value)), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {isKorean ? '이상적 비율' : 'Tỷ lệ lý tưởng'}: {cat.idealRange}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Balance Analysis */}
        {analysis && totalPower > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-highlight" />
                {isKorean ? '밸런스 분석' : 'Phân tích cân bằng'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.goods.length > 0 && (
                <div className="space-y-2">
                  {analysis.goods.map((good, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{good}</span>
                    </div>
                  ))}
                </div>
              )}
              {analysis.issues.length > 0 && (
                <div className="space-y-2">
                  {analysis.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 text-sm ${
                        issue.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                      }`}
                    >
                      {issue.type === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="h-4 w-4 shrink-0 mt-0.5" />
                      )}
                      <span>{issue.message}</span>
                    </div>
                  ))}
                </div>
              )}
              {analysis.issues.length === 0 && analysis.goods.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '더 정확한 분석을 위해 모든 카테고리에 값을 입력하세요.'
                    : 'Nhập giá trị cho tất cả các loại để phân tích chính xác hơn.'}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Power Distribution Chart */}
        {totalPower > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{isKorean ? '전투력 분포' : 'Phân bố CP'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {powerCategories
                  .filter((cat) => cat.value > 0)
                  .sort((a, b) => b.value - a.value)
                  .map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.key} className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${cat.color} shrink-0`} />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{cat.name}</span>
                            <span className={cat.color}>
                              {formatNumber(cat.value)} ({getPercentage(cat.value)}%)
                            </span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${cat.color.replace('text-', 'bg-')}`}
                              style={{ width: `${Math.min(Number(getPercentage(cat.value)), 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How to Increase Each Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-tip" />
              {isKorean ? '카테고리별 올리는 방법' : 'Cách tăng từng loại'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {powerCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.key} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Icon className={`h-5 w-5 ${cat.color} shrink-0 mt-0.5`} />
                    <div>
                      <p className={`font-medium ${cat.color}`}>{cat.name}</p>
                      <p className="text-sm text-muted-foreground">{cat.howToIncrease}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-tip/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-tip">
              <Lightbulb className="h-5 w-5" />
              {isKorean ? '초보자 팁' : 'Mẹo cho người mới'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {isKorean
                  ? '균형 잡힌 성장이 중요합니다. 한 카테고리에 치우치지 않고 모든 요소를 고르게 발전시키세요.'
                  : 'Phát triển cân bằng rất quan trọng. Đừng nghiêng về một loại.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {isKorean
                  ? '병력 전투력 48M + 건물 전투력 10M 조합으로 98-99%의 플레이어를 이길 수 있습니다.'
                  : 'Kết hợp 48M quân + 10M công trình có thể thắng 98-99% người chơi.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {isKorean
                  ? '병력 비율이 40-50%가 되도록 훈련을 지속적으로 유지하세요.'
                  : 'Duy trì huấn luyện liên tục để tỷ lệ quân đội đạt 40-50%.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {isKorean
                  ? '연맹 인정(AR) 연구를 먼저 완료하면 모든 보상이 2배가 됩니다.'
                  : 'Hoàn thành NC Alliance Recognition trước để nhân đôi mọi phần thưởng.'}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
