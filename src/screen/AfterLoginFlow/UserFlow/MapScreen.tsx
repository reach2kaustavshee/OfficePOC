import { Modal, View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React from 'react'

interface MapViewProps {
    isVisible: boolean;
    latitude: number;
    longitude: number;
    hotelName: string;
    hotelAddress: string;
    onClose: () => void;
}

const MapScreen: React.FC<MapViewProps> = ({ isVisible, latitude, longitude, hotelAddress, hotelName, onClose }) => {
    const initialRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isVisible}
                onRequestClose={onClose}
            >
                <View style={styles.modalContainer}>
                    {/* Close button */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>

                    {/* MapView inside Modal */}
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                    >
                        {/* Sample marker */}
                        <Marker
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude,
                            }}
                            title={hotelName}
                            description={hotelAddress}
                        />
                    </MapView>
                </View>
            </Modal>

        </View>
    )
}

export default MapScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1000,
    },
    closeButtonText: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

})