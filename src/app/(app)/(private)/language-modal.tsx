import { FlatList, View } from "react-native";
import { countries } from "countries-list";
import { CountryItem, SearchInput } from "@/components";
import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "expo-router";
import { useActiveLanguage } from "@/hooks";
import { useAppContext } from "@/context";

export default function LanguageModal() {
  const activeLanguage = useActiveLanguage();
  const appContext = useAppContext();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(activeLanguage.code);
  const { goBack } = useNavigation();
  const data = useMemo(() => {
    return Object.entries(countries)
      .map(([code, country]) => ({
        ...country,
        code,
      }))
      .filter(
        (country) =>
          !search.trim().length ||
          country.name.toLowerCase().includes(search.trim().toLowerCase())
      );
  }, [search]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <CountryItem
        code={item.code}
        name={item.name}
        onPress={() => {
          setSelected(item.code);
          appContext.setActiveLanguage(item.code);
          goBack();
        }}
        active={item.code.toLowerCase() === selected.toLowerCase()}
      />
    ),
    [selected]
  );

  const separator = useCallback(
    () => <View className={"h-[1px] bg-gray-100"} />,
    []
  );

  const keyExtractor = useCallback(
    (item: (typeof data)[number]) => item.code,
    []
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 71,
      offset: 71 * index,
      index,
    }),
    []
  );
  return (
    <View>
      <SearchInput value={search} onChange={setSearch} />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        extraData={selected}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}
