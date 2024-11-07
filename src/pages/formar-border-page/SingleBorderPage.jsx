import React, { useEffect, useState } from 'react';
import formerBorderStore from '../../api-request/borderStore';
import { useParams } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 12,
        color: '#6B7280', // Tailwind gray-500
    },
    text: {
        fontSize: 14,
        color: '#1F2937', // Tailwind gray-800
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        marginBottom: 20,
    },
});

const SingleBorderPDF = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>User Information</Text>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image src={data.img} style={styles.image} />
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.text}>{data.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.text}>{data.email}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Phone:</Text>
                        <Text style={styles.text}>{data.phone}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Date of Birth:</Text>
                        <Text style={styles.text}>{data.dob}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Father's Name:</Text>
                        <Text style={styles.text}>{data.father_name}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Mother's Name:</Text>
                        <Text style={styles.text}>{data.mother_name}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.text}>{data.address}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Institute Name:</Text>
                        <Text style={styles.text}>{data.institute_name}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

const SingleBorderPage = () => {
    const [loader, setLoader] = useState(false);
    const { formerBorderApi, formerBorderDataList } = formerBorderStore();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setLoader(true);
            await formerBorderApi();
            setLoader(false);
        })();
    }, [id]);

    const borderData = formerBorderDataList.find(border => border._id === id);

    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">User Information Form</h1>

            {loader ? (
                <p className="text-center">Loading...</p>
            ) : borderData ? (
                <PDFDownloadLink document={<SingleBorderPDF data={borderData} />} fileName="user_information.pdf">
                    {({ loading }) =>
                        loading ? (
                            <button className="btn btn-primary" disabled>Loading PDF...</button>
                        ) : (
                            <button className="btn btn-primary">Download PDF</button>
                        )
                    }
                </PDFDownloadLink>
            ) : (
                <p className="text-center">User data not found</p>
            )}
        </div>
    );
};

export default SingleBorderPage;
