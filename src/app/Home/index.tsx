import { View,  Image, Text, TouchableOpacity, TouchableOpacityProps, FlatList, Alert} from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";

import { FilterStatus } from "@/types/FilterStatus";
import { useState, useEffect } from "react";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDING,
  FilterStatus.DONE
] 

const ITEMS = [
  { id: "1", status: FilterStatus.PENDING, description: "Café" },
  { id: "2", status: FilterStatus.DONE, description: "Leite" },
  { id: "3", status: FilterStatus.PENDING, description: "Pão" },
  { id: "4", status: FilterStatus.DONE, description: "Arroz" },
  { id: "5", status: FilterStatus.PENDING, description: "Feijão" },
  // { id: "6", status: FilterStatus.PENDING, description: "Café" },
  // { id: "7", status: FilterStatus.DONE, description: "Leite" },
  // { id: "8", status: FilterStatus.PENDING, description: "Pão" },
  // { id: "9", status: FilterStatus.DONE, description: "Arroz" },
  // { id: "10", status: FilterStatus.PENDING, description: "Feijão" },
  // { id: "11", status: FilterStatus.PENDING, description: "Café" },
  // { id: "12", status: FilterStatus.DONE, description: "Leite" },
  // { id: "13", status: FilterStatus.PENDING, description: "Pão" },
  // { id: "14", status: FilterStatus.DONE, description: "Arroz" },
  // { id: "15", status: FilterStatus.PENDING, description: "Feijão" },
  
]

 export function Home() {

  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAddItem() {
    if(!description.trim()) {
      Alert.alert("Erro", "Por favor, informe o nome do item.");
      return;
    }

    const newItem = {
      id:Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    setItems(await itemsStorage.getByStatus(filter))
    setDescription("");

    Alert.alert("Sucesso", `${newItem.description} adicionado com sucesso!`);
    setFilter(FilterStatus.PENDING);
  }

  async function handleRemoveItem(id: string) {
    try {
      Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover este item?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            await itemsStorage.remove(id);
            setItems(await itemsStorage.getByStatus(filter));
          }
        }
      ]
    )
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  }

  async function handleStatusChange(id: string, status: FilterStatus) {
    try {
      await itemsStorage.updateStatus(id, status);
      setItems(await itemsStorage.getByStatus(filter));
      

    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status do item.");
    }
  }

  function handleClearItems() {
    Alert.alert(
      "Limpar lista",
      "Tem certeza que deseja limpar a lista de compras?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            await itemsStorage.clear();
            setItems([]);
          }
        }
      ]
    )
  }

  useEffect(() => {
    itemsStorage.getByStatus(filter).then((filteredItems) => {
      setItems(filteredItems);
    });
  }, [filter])

  return (
    <View style={styles.container}>
       <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
       <Input 
       placeholder="O que você precisa comprar?" 
       onChangeText={setDescription}
       value={description}
       />
       <Button title="Adicionar" onPress={handleAddItem}/>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter 
              key={status} 
              status={status} 
              isActive={status === filter} 
              onPress={() => { setFilter(status); }
            }
              />
            ))
          }

          <TouchableOpacity style={styles.clearButton} activeOpacity={0.8}>
            <Text style={styles.clearText} onPress={handleClearItems}>Limpar</Text>
          </TouchableOpacity>
        </View>

          <FlatList 
           data={items}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => (
             <Item 
               data={item} 
               onRemove={() => { handleRemoveItem(item.id); }}
               onStatusChange={() => { handleStatusChange(item.id, item.status); }} 
             />
           )}
           showsVerticalScrollIndicator={false}
           ItemSeparatorComponent={() => <View style={styles.separator} />}
           contentContainerStyle={styles.listContent}
           ListEmptyComponent={() => <Text style={styles.empty} >Nenhum item aqui</Text>
          }
          />

      </View>
    </View>
  )
}

