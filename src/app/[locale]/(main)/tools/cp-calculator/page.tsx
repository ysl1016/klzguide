'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calculator, TrendingUp, Building2, FlaskConical, Users, Wrench, Swords } from 'lucide-react';

export default function CPCalculatorPage() {
  const t = useTranslations();

  return <CPCalculatorContent />;
}

function CPCalculatorContent() {
  const t = useTranslations();
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
      name: '건물',
      nameVi: 'Công trình',
      icon: Building2,
      color: 'text-blue-400',
      value: structurePower,
      setValue: setStructurePower,
    },
    {
      name: '기술',
      nameVi: 'Công nghệ',
      icon: FlaskConical,
      color: 'text-purple-400',
      value: techPower,
      setValue: setTechPower,
    },
    {
      name: '병력',
      nameVi: 'Quân đội',
      icon: Swords,
      color: 'text-green-400',
      value: troopPower,
      setValue: setTroopPower,
    },
    {
      name: '영웅',
      nameVi: 'Anh hùng',
      icon: Users,
      color: 'text-yellow-400',
      value: heroPower,
      setValue: setHeroPower,
    },
    {
      name: '차량',
      nameVi: 'Xe',
      icon: Wrench,
      color: 'text-orange-400',
      value: vehiclePower,
      setValue: setVehiclePower,
    },
  ];

  const getPercentage = (value: number) => {
    if (totalPower === 0) return 0;
    return ((value / totalPower) * 100).toFixed(1);
  };

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calculator className="h-8 w-8 text-highlight" />
            CP 계산기 / Máy tính CP
          </h1>
          <p className="text-muted-foreground">
            전투력 구성 요소를 입력하여 총 CP와 비율을 확인하세요.
          </p>
        </div>

        {/* Total Power Display */}
        <Card className="border-highlight/50 bg-highlight/5">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">총 전투력 / Tổng CP</p>
            <p className="text-5xl font-bold text-highlight">{formatNumber(totalPower)}</p>
          </CardContent>
        </Card>

        {/* Power Inputs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {powerCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.name}>
                <CardHeader className="pb-2">
                  <CardTitle className={`flex items-center gap-2 text-lg ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                    {cat.name} / {cat.nameVi}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label htmlFor={cat.name} className="text-sm font-medium">Power</label>
                    <Input
                      id={cat.name}
                      type="number"
                      value={cat.value || ''}
                      onChange={(e) => cat.setValue(Number(e.target.value) || 0)}
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">비율</span>
                    <span className={cat.color}>{getPercentage(cat.value)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color.replace('text-', 'bg-')}`}
                      style={{ width: `${getPercentage(cat.value)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Power Distribution */}
        {totalPower > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>전투력 분포 / Phân bố CP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {powerCategories
                  .filter((cat) => cat.value > 0)
                  .sort((a, b) => b.value - a.value)
                  .map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.name} className="flex items-center gap-3">
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
                              style={{ width: `${getPercentage(cat.value)}%` }}
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

        {/* Tips */}
        <Card className="border-tip/30">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              💡 균형 잡힌 성장이 중요합니다. 한 카테고리에 치우치지 않고 모든 요소를 고르게 발전시키세요.
              병력 전투력 48M + 건물 전투력 10M 조합으로 98-99%의 플레이어를 이길 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
