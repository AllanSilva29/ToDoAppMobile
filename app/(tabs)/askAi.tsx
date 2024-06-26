import React, { useState, useRef, useEffect } from "react";
import { FlatList } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  Theme,
  styled,
  ScrollView,
} from "tamagui";
import axios from "axios";
import appEnv from "utils/appEnv";
import { useSelector } from "react-redux";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const MessageBubble: any = styled(YStack, {
  maxWidth: "80%",
  padding: 10,
  borderRadius: 20,
  marginVertical: 5,

  variants: {
    isUser: {
      true: {
        alignSelf: "flex-end",
        backgroundColor: "$blue10",
      },
      false: {
        alignSelf: "flex-start",
        backgroundColor: "$gray5",
      },
    },
  },
});

const MessageText = styled(Text, {
  fontSize: 16,

  variants: {
    isUser: {
      true: {
        color: "white",
      },
      false: {
        color: "black",
      },
    },
  },
});

const AIChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contextSent, setContextSent] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const context = useSelector((state: any) => state.todoStore.todos);

  const getGroqChatCompletion = async (userMessage: string) => {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
          model: "llama3-8b-8192",
        },
        {
          headers: {
            Authorization: `Bearer ${appEnv.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("Error fetching Groq response:", error);
      return "Sorry, I encountered an error while processing your request.";
    }
  };

  const handleSend = async (optionalContext: string = "") => {
    if (inputText.trim() || optionalContext) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText("");
      setIsLoading(true);

      // Get AI response from Groq
      const aiResponse = await getGroqChatCompletion(
        optionalContext ? optionalContext : userMessage.text
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble isUser={item.isUser}>
      <MessageText isUser={item.isUser}>{item.text}</MessageText>
    </MessageBubble>
  );

  const sendContextOnce = (context: any) => {
    const messageContext = `. Por favor, importante, sempre responda em Português Brasileiro. 
    Este é um chatbot de tarefas. Faça uma avaliação das tarefas pendentes que estão no array e retorne como resposta dicas.
    Analise principalmente o 'description' de cada uma e dê dicas gerais sobre o que focar nas próximas atividades.`;

    handleSend(JSON.stringify(context) + messageContext);
  };

  useEffect(() => {
    //@ts-ignore
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <Theme name="light">
      <YStack flex={1} backgroundColor="$background">
        <ScrollView
          flex={1}
          contentContainerStyle={{ padding: 10 }}
          onContentSizeChange={() =>
            //@ts-ignore
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </ScrollView>
        {!contextSent && (
          <Button
            onPress={() => sendContextOnce(context)}
            backgroundColor="$blue5"
            size="$4"
            padding="$2"
            margin="$2"
            elevation={0}
            borderRadius={10}
          >
            Pedir conselhos sobre tarefas
          </Button>
        )}
        <XStack padding={10} gap={10} backgroundColor="$background">
          <Input
            flex={1}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite algo..."
            autoCapitalize="none"
            editable={!isLoading}
          />
          <Button onPress={() => handleSend()} disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar"}
          </Button>
        </XStack>
      </YStack>
    </Theme>
  );
};

export default AIChatScreen;
