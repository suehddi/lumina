import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export default function CreateScreen() {
  const [contentType, setContentType] = useState<'video' | 'image' | 'post'>('post');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Título obrigatório');
      return;
    }

    try {
      setLoading(true);
      const userId = 'user123'; // Substituir com auth real

      const response = await axios.post(`${API_BASE_URL}/feed/upload`, {
        userId,
        title,
        description,
        videoUrl: 'https://example.com/video.mp4',
      });

      Alert.alert('Sucesso', 'Conteúdo criado com sucesso!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao criar conteúdo:', error);
      Alert.alert('Erro', 'Erro ao criar conteúdo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✨ Criar Conteúdo</Text>
        <Text style={styles.headerSubtitle}>Compartilhe sua fé com a comunidade</Text>
      </View>

      {/* Content Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipo de Conteúdo</Text>
        <View style={styles.typeButtons}>
          {[
            { id: 'post', label: '📝 Post', icon: 'type' },
            { id: 'image', label: '🖼️ Imagem', icon: 'image' },
            { id: 'video', label: '🎬 Vídeo', icon: 'video' },
          ].map((type: any) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                contentType === type.id && styles.typeButtonActive,
              ]}
              onPress={() => setContentType(type.id)}
            >
              <Icon
                name={type.icon}
                size={24}
                color={contentType === type.id ? '#D4AF37' : '#666'}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  contentType === type.id && styles.typeButtonTextActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Title Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu título aqui..."
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />
        <Text style={styles.charCount}>{title.length}/100</Text>
      </View>

      {/* Description Input */}
      <View style={styles.section}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Conte mais sobre seu conteúdo..."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          maxLength={500}
        />
        <Text style={styles.charCount}>{description.length}/500</Text>
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.label}>Tags (separadas por vírgula)</Text>
        <TextInput
          style={styles.input}
          placeholder="#fé #inspiração #deus"
          placeholderTextColor="#999"
        />
      </View>

      {/* Privacy Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidade</Text>
        <TouchableOpacity style={styles.privacyOption}>
          <View style={styles.radioButton}>
            <View style={styles.radioButtonInner} />
          </View>
          <View>
            <Text style={styles.privacyOptionTitle}>🌍 Público</Text>
            <Text style={styles.privacyOptionDesc}>
              Todos podem ver e interagir
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.privacyOption}>
          <View style={styles.radioButton}>
            <View style={styles.radioButtonInnerInactive} />
          </View>
          <View>
            <Text style={styles.privacyOptionTitle}>👥 Amigos</Text>
            <Text style={styles.privacyOptionDesc}>
              Apenas meus seguidores veem
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Create Button */}
      <TouchableOpacity
        style={[styles.createButton, loading && styles.createButtonDisabled]}
        onPress={handleCreatePost}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <>
            <Icon name="upload" size={20} color="#FFF" />
            <Text style={styles.createButtonText}>Publicar Conteúdo</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Icon name="alert-circle" size={20} color="#0066CC" />
        <Text style={styles.infoText}>
          Certifique-se de que seu conteúdo está de acordo com nossas políticas de
          comunidade. Conteúdo ofensivo será removido.
        </Text>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#CCC',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  typeButtonActive: {
    backgroundColor: '#FFFACD',
    borderColor: '#D4AF37',
  },
  typeButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#D4AF37',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  textarea: {
    textAlignVertical: 'top',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    textAlign: 'right',
  },
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D4AF37',
  },
  radioButtonInnerInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  privacyOptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  privacyOptionDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  createButton: {
    backgroundColor: '#D4AF37',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#0066CC',
    lineHeight: 18,
  },
  spacer: {
    height: 30,
  },
});
